import Point from "@arcgis/core/geometry/Point";
import { watch } from "@vertigis/arcgis-extensions/support/observableUtils";
import type { MapModel } from "@vertigis/web/mapping";
import type {
    PropertyDefs,
    ComponentModelProperties,
} from "@vertigis/web/models";
import {
    ComponentModelBase,
    serializable,
    importModel,
} from "@vertigis/web/models";
import { throttle } from "@vertigis/web/ui";
import type { IViewer, ViewerImageEvent, LngLat } from "mapillary-js";

interface MapillaryModelProperties extends ComponentModelProperties {
    mapillaryKey?: string;
    searchRadius?: number;
    defaultScale?: number;
    startSynced?: boolean;
}

interface MapillaryCamera {
    latitude: number;
    longitude: number;
    heading: number;
    tilt: number;
    fov: number;
}

/**
 *  Convert Mapillary bearing to a Scene's camera rotation.
 *  @param bearing Mapillary bearing in degrees (degrees relative to due north).
 *  @returns Scene camera rotation in degrees (degrees rotation of due north).
 */
function getCameraRotationFromBearing(bearing: number): number {
    return 360 - bearing;
}

@serializable
export default class MapillaryModel extends ComponentModelBase<MapillaryModelProperties> {
    mapillaryKey: string;
    searchRadius: number;
    defaultScale: number;
    startSynced: boolean;
    synchronizePosition: boolean;

    readonly imageQueryUrl = "https://a.mapillary.com/v3/images";

    // The latest location received from a locationmarker.update event
    currentMarkerPosition: { latitude: number; longitude: number };
    updating = false;

    // The computed position of the current Mapillary image
    private _currentImagePosition: LngLat;

    private _awaitViewHandle: IHandle;
    private _viewerUpdateHandle: IHandle;
    private _handleMarkerUpdate = true;
    private _synced = false;

    /**
     * Handles pov changes once the image position is known.
     */
    private readonly _onPerspectiveChange = throttle(async () => {
        if (!this.map || !this.mapillary || this.updating) {
            return;
        }

        this.updating = true;

        const { latitude, longitude, heading, tilt, fov } =
            await this._getMapillaryCamera();

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
            this.synchronizePosition
                ? this.messages.commands.map.zoomToViewpoint.execute({
                      maps: this.map,
                      viewpoint: {
                          rotation: getCameraRotationFromBearing(heading),
                          targetGeometry: centerPoint,
                          scale: this.defaultScale,
                      },
                  })
                : undefined,
        ]).finally(() => (this.updating = false));
    }, 128);

    private _mapillary: IViewer | undefined;
    get mapillary(): IViewer | undefined {
        return this._mapillary;
    }
    set mapillary(instance: IViewer | undefined) {
        if (instance === this._mapillary) {
            return;
        }

        this._viewerUpdateHandle?.remove();

        // If an instance already exists, clean it up first.
        if (this._mapillary) {
            // Clean up event handlers.
            this.mapillary.off("image", this._onImageChange);
            this.mapillary.off("pov", this._onPerspectiveChange);

            // Activating the cover appears to be the best way to "clean up" Mapillary.
            // https://github.com/mapillary/mapillary-js/blob/8b6fc2f36e3011218954d95d601062ff6aa41ad9/src/viewer/ComponentController.ts#L184-L192
            this.mapillary.activateCover();

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._unsyncMaps();
        }

        this._mapillary = instance;

        // A new instance is being set - add the event handlers.
        if (instance) {
            // Listen for changes to the currently displayed mapillary image
            this.mapillary.on("image", this._onImageChange);

            // Change the current mapillary image when the location marker is moved.
            this._viewerUpdateHandle =
                this.messages.events.locationMarker.updated.subscribe((event) =>
                    this._handleViewerUpdate(event)
                );
        }

        // We may need to sync if the map and initialized view have arrived first.
        if (!this._synced && this.map.view) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._syncMaps();
        }
    }

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
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._unsyncMaps();
        }
        this._map = instance;

        // We may need to wait for the view to arrive before proceeding.
        this._awaitViewHandle = watch(this.map, "view", (view) => {
            if (view) {
                this._awaitViewHandle.remove();
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._syncMaps();
            }
        });
    }

    async recenter(): Promise<void> {
        const { latitude, longitude, heading } =
            await this._getMapillaryCamera();

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

    // TODO: Bring back when CORS issue is resolved.
    // https://forum.mapillary.com/t/web-app-blocked-by-cors-policy-mapillary/5357
    // https://forum.mapillary.com/t/cors-error-when-requesting-coverage-vector-tiles/5303

    // async moveCloseToPosition(latitude: number, longitude: number):
    // Promise<void> {try {const url =
    // `https://tiles.mapillary.com/maps/vtp/mly1_public/2/17/${latitude}/${longitude}?access_token=${this.mapillaryKey}`;
    // const response = await fetch(url); const data = await response.json();
    // const imgKey = data?.features?.[0]?.properties?.key;

    //         if (imgKey) {
    //             await this.mapillary.moveTo(imgKey);
    //             this.updating = false;
    //         } else {
    //             this.updating = false;
    //             this._activateCover();
    //         }
    //     } catch {
    //         this.updating = false;
    //         this._activateCover();
    //     }

    protected override async _onDestroy(): Promise<void> {
        await super._onDestroy();
        this._viewerUpdateHandle?.remove();
        this._awaitViewHandle?.remove();
    }

    protected override _getSerializableProperties(): PropertyDefs<MapillaryModelProperties> {
        const props = super._getSerializableProperties();
        return {
            ...props,
            mapillaryKey: {
                serializeModes: ["initial"],
                default: "",
            },
            searchRadius: {
                serializeModes: ["initial"],
                default: 500,
            },
            defaultScale: {
                serializeModes: ["initial"],
                default: 3000,
            },
            startSynced: {
                serializeModes: ["initial"],
                default: true,
            },
            title: {
                ...this._toPropertyDef(props.title),
                default: "language-web-incubator-mapillary-title",
            },
            icon: {
                ...this._toPropertyDef(props.icon),
                default: "map-3rd-party",
            },
        };
    }

    /**
     * Setup the initial state of the maps such as the location marker and map
     * position.
     */
    private async _syncMaps(): Promise<void> {
        if (!this.map || !this.mapillary || this._synced) {
            return;
        }

        this._synced = true;
        this.synchronizePosition = this.startSynced ?? true;

        // Set mapillary as close as possible to the center of the view
        // await this.moveCloseToPosition(
        //     this.map.view.center.latitude,
        //     this.map.view.center.longitude
        // );

        // Create location marker based on current location from Mapillary and
        // pan/zoom VertiGIS Studio map to the location.
        const { latitude, longitude, heading, tilt, fov } =
            await this._getMapillaryCamera();

        const centerPoint = new Point({ latitude, longitude });
        await Promise.all([
            this.messages.commands.locationMarker.create.execute({
                fov,
                geometry: centerPoint,
                heading,
                tilt,
                id: this.id,
                maps: this.map,
                // When the CORS issue above is resolved change this to `true`
                userDraggable: false,
            }),
            this.synchronizePosition
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
            this.currentMarkerPosition = {
                latitude: updatePoint.latitude,
                longitude: updatePoint.longitude,
            };
        }
        this._handleMarkerUpdate = true;
    }

    /**
     * When the 'merged' property is set on the image we know that the position
     * reported will be the computed location rather than a raw GPS value. We
     * ignore all updates sent while the computed position is unknown as the raw
     * GPS value can be inaccurate and will not exactly match the observed
     * position of the camera. See:
     * https://bl.ocks.org/oscarlorentzon/16946cb9eedfad2a64669cb1121e6c75
     */
    private readonly _onImageChange = (event: ViewerImageEvent) => {
        const { image } = event;
        if (image.merged) {
            this._currentImagePosition = image.lngLat;

            // Set the initial marker position for this image.
            this._onPerspectiveChange();

            // Handle further pov changes.
            this.mapillary.on("pov", this._onPerspectiveChange);
        } else {
            this._currentImagePosition = undefined;
            this.mapillary.off("pov", this._onPerspectiveChange);
        }
    };

    /**
     * Gets the current POV of the mapillary camera
     */
    private async _getMapillaryCamera(): Promise<MapillaryCamera | undefined> {
        if (!this.mapillary) {
            return undefined;
        }

        // Will return a raw GPS value if the image position has not yet been calculated.
        const [{ lat, lng }, { bearing, tilt }, fov] = await Promise.all([
            this._currentImagePosition ?? this.mapillary.getPosition(),
            this.mapillary.getPointOfView() as Promise<{
                bearing: number;
                tilt: number;
            }>,
            this.mapillary.getFieldOfView(),
        ]);

        return {
            latitude: lat,
            longitude: lng,
            heading: bearing,
            tilt: tilt + 90,
            fov,
        };
    }

    private _activateCover() {
        this.updating = false;
        this.mapillary.activateCover();
    }
}
