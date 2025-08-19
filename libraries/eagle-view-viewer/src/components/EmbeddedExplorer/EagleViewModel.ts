import Viewpoint from "@arcgis/core/Viewpoint";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as projectOperator from "@arcgis/core/geometry/operators/projectOperator";
import type { MapModel } from "@vertigis/web/mapping";
import type {
    ComponentModelProperties,
    PropertyDefs,
} from "@vertigis/web/models";
import {
    serializable,
    ComponentModelBase,
    importModel,
} from "@vertigis/web/models";
import { debounce } from "@vertigis/web/ui/debounce";

import type {
    EagleViewView,
    EmbeddedExplorerInstance,
} from "./embedded-explorer";

interface EagleViewProperties extends ComponentModelProperties {
    apiKey?: string;
}

export enum ViewUpdatedEventSource {
    e3,
    VSW,
    None,
}

@serializable
export default class EagleViewModel extends ComponentModelBase<EagleViewProperties> {
    apiKey: string;
    mapUpdateEventSource = ViewUpdatedEventSource.None;
    private _viewpointChangeHandle: IHandle;
    private _lastWebPoint: Viewpoint | undefined;
    private _lastEagleViewPoint: EagleViewView | undefined;

    /**
     * Set/Get MapModel
     */
    private _map: MapModel | undefined;

    get map(): MapModel | undefined {
        return this._map;
    }
    @importModel("map-extension")
    set map(map: MapModel | undefined) {
        console.log("EagleViewModel.setMap()");
        if (map === this._map) {
            return;
        }
        this._viewpointChangeHandle?.remove();
        this._map = map;
        this._viewpointChangeHandle =
            this.messages.events.map.viewpointChanged.subscribe(
                debounce(() => this._onVSWMapExtentUpdated(), 100)
            );
    }

    /**
     * Set/Get Eagleview embedded viewer
     */
    private _e3: EmbeddedExplorerInstance | undefined;

    get e3(): EmbeddedExplorerInstance | undefined {
        return this._e3;
    }

    set e3(instance: EmbeddedExplorerInstance | undefined) {
        if (instance === this._e3) {
            return;
        }

        // If an instance already exists, clean it up first.
        if (this._e3) {
            this._e3.off("onViewUpdate");
        }

        this._e3 = instance;
        this._e3?.on("onMapReady", () => {
            this._e3.on("onViewUpdate", (args: EagleViewView) =>
                this._onE3ViewUpdated(args)
            );
        });
    }

    /**
     * Re-projects if necessary, a point to Web Mercator
     * @param position
     * @returns position, in Web Mercator
     */
    getPointForEagleView(force: boolean): EagleViewView {
        let position = this.map.view.center;
        if (!position.spatialReference.isWebMercator) {
            position = projectOperator.execute(
                position,
                new SpatialReference({ wkid: 3857 })
            ) as Point;
        }

        // EagleView uses a different rotation direction, so we need to negate it
        const rotation = 360 - this.map.view.viewpoint.rotation;
        const zoom = this.map.view.zoom - 1;

        // Attempt to avoid unnecessary updates to the EagleView view.
        if (
            !force &&
            this._lastEagleViewPoint?.lonLat?.lat === position.latitude &&
            this._lastEagleViewPoint.lonLat.lon === position.longitude &&
            isWithinTolerance(this._lastEagleViewPoint.rotation, rotation, 1) &&
            isWithinTolerance(this._lastEagleViewPoint.zoom, zoom, 1)
        ) {
            return undefined;
        }

        return (this._lastEagleViewPoint = {
            lonLat: { lat: position.latitude, lon: position.longitude },
            rotation,
            zoom,
        });
    }

    protected override async _onInitialize(): Promise<void> {
        await super._onInitialize();

        if (!projectOperator.isLoaded()) {
            await projectOperator.load();
        }
    }

    protected override _getSerializableProperties(): PropertyDefs<EagleViewProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            apiKey: {
                serializeModes: ["initial"],
                default: "",
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-view-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }

    private _onVSWMapExtentUpdated(): void {
        if (this.map && this.e3) {
            // if e3 wasn't the ViewUpdatedEventSource, ignore this./
            // this would be the case if the view updated event was triggered by
            // the VSW map being updated.
            if (this.mapUpdateEventSource !== ViewUpdatedEventSource.None) {
                return;
            }

            try {
                this.mapUpdateEventSource = ViewUpdatedEventSource.VSW;
                const viewpoint = this.getPointForEagleView(false);
                if (viewpoint) {
                    this.e3.off("onViewUpdate");
                    this.e3.setView(viewpoint, () => {
                        this.mapUpdateEventSource = ViewUpdatedEventSource.None;
                        this.e3.on("onViewUpdate", (args: EagleViewView) =>
                            this._onE3ViewUpdated(args)
                        );
                    });
                } else {
                    this.mapUpdateEventSource = ViewUpdatedEventSource.None;
                }
            } catch {
                // Do nothing.
            }
        }
    }

    /**
     * Update the webview to reflect the EagleView view update. This is called
     * when the EagleView view is updated by user interaction.
     */
    private async _onE3ViewUpdated(updatedView: EagleViewView) {
        if (this.mapUpdateEventSource !== ViewUpdatedEventSource.None) {
            return;
        }

        try {
            this.mapUpdateEventSource = ViewUpdatedEventSource.e3;
            const point = new Point({
                x: updatedView.lonLat.lon,
                y: updatedView.lonLat.lat,
                spatialReference: new SpatialReference({ wkid: 4326 }),
            });

            // Need to convert the zoom level to map scale Eagleview appears to
            // use MapBox tile schema, so we need to add 1 to the zoom level
            const zoom = Math.round(updatedView.zoom + 1);
            const vswScale = (<any>this.map).scaleLevels.items[zoom];

            const viewpoint = new Viewpoint({
                targetGeometry: point,
                rotation: updatedView.rotation * -1,
                scale: vswScale,
            });

            // Check to see if the point is in the same SR as the map. If not,
            // we need to re-project it
            if (
                point.spatialReference.wkid !== this.map.spatialReference.wkid
            ) {
                viewpoint.targetGeometry = projectOperator.execute(
                    point,
                    this.map.spatialReference
                ) as Point;
            }

            // Attempt to avoid unnecessary updates to the VSW map.
            if (
                (this._lastWebPoint?.targetGeometry as Point)?.equals(point) &&
                isWithinTolerance(
                    this._lastWebPoint.rotation,
                    viewpoint.rotation,
                    1
                ) &&
                isWithinTolerance(this._lastWebPoint.scale, viewpoint.scale, 1)
            ) {
                return;
            }

            this._lastWebPoint = viewpoint;
            this._viewpointChangeHandle?.remove();
            await this.messages.commands.map.goToViewpoint.execute({
                viewpoint,
            });
        } finally {
            requestAnimationFrame(() => {
                this.mapUpdateEventSource = ViewUpdatedEventSource.None;
                this._viewpointChangeHandle =
                    this.messages.events.map.viewpointChanged.subscribe(
                        debounce(() => this._onVSWMapExtentUpdated(), 100)
                    );
            });
        }
    }
}

const isWithinTolerance = (a: number, b: number, tolerance: number): boolean =>
    Math.abs(a - b) <= tolerance;
