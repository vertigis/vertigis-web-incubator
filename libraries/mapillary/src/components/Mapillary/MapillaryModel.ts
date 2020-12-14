import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    importModel,
    PropertyDefs,
    ComponentModelProperties,
} from "@vertigis/web/models";
import { throttle } from "@vertigis/web/ui";
import Point from "esri/geometry/Point";
import { Viewer, Node } from "mapillary-js";

/**
 *  Convert Mapillary bearing to a Scene's camera rotation.
 *  @param bearing Mapillary bearing in degrees (degrees relative to due north).
 *  @returns Scene camera rotation in degrees (degrees rotation of due north).
 */
function getCameraRotationFromBearing(bearing: number): number {
    return 360 - bearing;
}

interface MapillaryCamera {
    latitude: number;
    longitude: number;
    heading: number;
    tilt: number;
    fov: number;
}

@serializable
export default class MapillaryModel extends ComponentModelBase {
    // TODO: Make all readonly properties configurable in Designer
    readonly mapillaryKey =
        "ZU5PcllvUTJIX24wOW9LSkR4dlE5UTo3NTZiMzY4ZjBlM2U2Nzlm";
    readonly imageQueryUrl = "https://a.mapillary.com/v3/images";
    readonly searchRadius = 500; // meters
    readonly defaultScale = 3000;

    // The latest location received from a locationmarker.update event
    private _currentMarkerPosition: { latitude: number; longitude: number };

    // The computed position of the current Mapillary node
    private _currentNodePosition: { lat: number; lon: number };

    private _updating = false;
    private _viewerUpdateHandle: IHandle;
    private _handleMarkerUpdate = true;
    private _synced = false;

    mouseDownHandler = (): void => (this._currentMarkerPosition = undefined);
    mouseUpHandler = (): void => {
        if (
            this.mapillary?.isNavigable &&
            !this._updating &&
            this._currentMarkerPosition
        ) {
            this._updating = true;

            const { latitude, longitude } = this._currentMarkerPosition;
            this._currentMarkerPosition = undefined;

            void this._moveCloseToPosition(latitude, longitude);
        }
    };

    // Set this to false to start with the maps unsynced
    sync = true;

    /**
     * This is the Mapillary API instance running within this component.
     */
    private _mapillary: any | undefined;
    get mapillary(): any | undefined {
        return this._mapillary;
    }
    set mapillary(instance: any | undefined) {
        if (instance === this._mapillary) {
            return;
        }

        if (this._viewerUpdateHandle) {
            this._viewerUpdateHandle.remove();
        }

        // If an instance already exists, clean it up first.
        if (this._mapillary) {
            // Clean up event handlers.
            this.mapillary.off(Viewer.nodechanged, this._onNodeChange);
            this.mapillary.off(Viewer.povchanged, this._onPerspectiveChange);

            // Activating the cover appears to be the best way to "clean up" Mapillary.
            // https://github.com/mapillary/mapillary-js/blob/8b6fc2f36e3011218954d95d601062ff6aa41ad9/src/viewer/ComponentController.ts#L184-L192
            this.mapillary.activateCover();

            void this._unsyncMaps();
        }

        this._mapillary = instance;

        // A new instance is being set - add the event handlers.
        if (instance) {
            // Listen for changes to the currently displayed mapillary node
            this.mapillary.on(Viewer.nodechanged, this._onNodeChange);

            // Change the current mapillary node when the location marker is moved.
            this._viewerUpdateHandle = this.messages.events.locationMarker.updated.subscribe(
                (event) => this._handleViewerUpdate(event)
            );
        }

        // We may still need to sync if the map/view arrived first
        if (!this._synced && this.map) {
            void this._syncMaps();
        }
    }

    /**
     * This the model associated with the Map component whose view will be
     * synced with Mapillary. We will be automatically assigned this via the
     * @importModel expression.
     */
    private _map: MapModel | undefined;
    get map(): MapModel | undefined {
        return this._map;
    }
    @importModel("map-extension")
    set map(instance: MapModel | undefined) {
        if (instance === this._map) {
            return;
        }

        // If an instance already exists, clean it up first.
        if (this._map) {
            void this._unsyncMaps();
        }
        this._map = instance;

        if (instance) {
            // We need to wait for the arrival of the view in order to sync with Mapillary.
            if (instance.view) {
                void this._syncMaps();
            } else {
                instance.watch("view", () => void this._syncMaps());
            }

            document.body.addEventListener("mousedown", this.mouseDownHandler);
            document.body.addEventListener("mouseup", this.mouseUpHandler);
        }
    }

    async recenter(): Promise<void> {
        const {
            latitude,
            longitude,
            heading,
        } = await this._getMapillaryCamera();

        const centerPoint = new Point({
            latitude,
            longitude,
        });

        await this.messages.commands.map.zoomToViewpoint.execute({
            maps: this.map,
            viewpoint: {
                rotation: getCameraRotationFromBearing(heading),
                targetGeometry: centerPoint,
                scale: this.defaultScale,
            },
        });
    }

    /**
     * Setup the initial state of the maps such as the location marker and map
     * position.
     */
    private async _syncMaps(): Promise<void> {
        if (!this.map || !this.mapillary) {
            return;
        }

        this._synced = true;

        // Wait for the arrival of the view if it isn't attached yet.
        if (!this.map.view) {
            this.map.watch("view", () => void this._syncMaps());
            return;
        }

        // Set mapillary as close as possible to the center of the view
        await this._moveCloseToPosition(
            this.map.view.center.latitude,
            this.map.view.center.longitude
        );

        // Create location marker based on current location from Mapillary and
        // pan/zoom Geocortex map to the location.
        const {
            latitude,
            longitude,
            heading,
            tilt,
            fov,
        } = await this._getMapillaryCamera();

        const centerPoint = new Point({ latitude, longitude });
        await Promise.all([
            this.messages.commands.locationMarker.create.execute({
                fov,
                geometry: centerPoint,
                heading,
                tilt,
                id: this.id,
                maps: this.map,
                userDraggable: true,
            }),
            this.sync
                ? this.messages.commands.map.zoomToViewpoint.execute({
                      maps: this.map,
                      viewpoint: {
                          rotation: getCameraRotationFromBearing(heading),
                          targetGeometry: centerPoint,
                          scale: this.defaultScale,
                      },
                  })
                : undefined,
        ]);
    }

    private async _unsyncMaps(): Promise<void> {
        this._synced = false;

        await this.messages.commands.locationMarker.remove.execute({
            id: this.id,
            maps: this.map,
        });
    }

    private _handleViewerUpdate(event: any): void {
        if (this._handleMarkerUpdate) {
            const updatePoint = event.geometry as Point;
            this._currentMarkerPosition = {
                latitude: updatePoint.latitude,
                longitude: updatePoint.longitude,
            };
        }
        this._handleMarkerUpdate = true;
    }

    private async _moveCloseToPosition(
        latitude: number,
        longitude: number
    ): Promise<void> {
        // https://www.mapillary.com/developer/api-documentation/#images
        const url = `${this.imageQueryUrl}?client_id=${this.mapillaryKey}&closeto=${longitude},${latitude}&radius=${this.searchRadius}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        const imgKey = data?.features?.[0]?.properties?.key;

        if (imgKey) {
            await this.mapillary.moveToKey(imgKey);
            this._updating = false;
        } else {
            this._activateCover();
        }
    }

    /**
     * When the 'merged' property is set on the node we know that the position
     * reported will be the computed location rather than a raw GPS value. We
     * ignore all updates sent while the computed position is unknown as the raw
     * GPS value can be inaccurate and will not exactly match the observed
     * position of the camera. See:
     * https://bl.ocks.org/oscarlorentzon/16946cb9eedfad2a64669cb1121e6c75
     */
    private _onNodeChange = (node: Node) => {
        if (node.merged) {
            this._currentNodePosition = node.latLon;

            // Set the initial marker position for this node.
            this._onPerspectiveChange();

            // Handle further pov changes.
            this.mapillary.on(Viewer.povchanged, this._onPerspectiveChange);
        } else {
            this._currentNodePosition = undefined;
            this.mapillary.off(Viewer.povchanged, this._onPerspectiveChange);
        }
    };

    /**
     * Handles pov changes once the node position is known.
     */
    private _onPerspectiveChange = throttle(async () => {
        if (!this.map || !this.mapillary || this._updating) {
            return;
        }

        this._updating = true;

        const {
            latitude,
            longitude,
            heading,
            tilt,
            fov,
        } = await this._getMapillaryCamera();

        const centerPoint = new Point({
            latitude,
            longitude,
        });

        this._handleMarkerUpdate = false;

        await Promise.all([
            this.messages.commands.locationMarker.update.execute({
                geometry: centerPoint,
                heading,
                tilt,
                fov,
                id: this.id,
                maps: this.map,
            }),
            this.sync
                ? this.messages.commands.map.zoomToViewpoint.execute({
                      maps: this.map,
                      viewpoint: {
                          rotation: getCameraRotationFromBearing(heading),
                          targetGeometry: centerPoint,
                          scale: 3000,
                      },
                  })
                : undefined,
        ]).finally(() => (this._updating = false));
    }, 128);

    /**
     * Gets the current POV of the mapillary camera
     */
    private async _getMapillaryCamera(): Promise<MapillaryCamera | undefined> {
        if (!this.mapillary) {
            return undefined;
        }

        // Will return a raw GPS value if the node position has not yet been calculated.
        const [{ lat, lon }, { bearing, tilt }, fov] = await Promise.all([
            this._currentNodePosition ?? this.mapillary.getPosition(),
            this.mapillary.getPointOfView() as Promise<{
                bearing: number;
                tilt: number;
            }>,
            this.mapillary.getFieldOfView(),
        ]);

        return {
            latitude: lat,
            longitude: lon,
            heading: bearing,
            tilt: tilt + 90,
            fov,
        };
    }

    private _activateCover() {
        this._updating = false;
        this.mapillary.activateCover();
    }

    protected _getSerializableProperties(): PropertyDefs<ComponentModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            title: {
                ...this._toPropertyDef(props.title),
                default: "Mapillary",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }
}
