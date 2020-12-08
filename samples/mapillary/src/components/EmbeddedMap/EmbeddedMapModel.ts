import { MapModel } from "@vertigis/web/mapping";
import {
    ComponentModelBase,
    serializable,
    importModel,
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
export default class EmbeddedMapModel extends ComponentModelBase {
    // For demonstration purposes only.
    // Replace this with your own client ID from mapillary.com
    readonly mapillaryKey =
        "ZU5PcllvUTJIX24wOW9LSkR4dlE5UTo3NTZiMzY4ZjBlM2U2Nzlm";

    // The computed position of the current Mapillary node
    private _currentNodePosition: { lat: number; lon: number };

    private _mapillary: any | undefined;
    get mapillary(): any | undefined {
        return this._mapillary;
    }
    set mapillary(instance: any | undefined) {
        if (instance === this._mapillary) {
            return;
        }

        // If an instance already exists, clean it up first.
        if (this._mapillary) {
            // Clean up event handlers.
            this.mapillary.off(Viewer.nodechanged, this._onNodeChange);
            this.mapillary.off(Viewer.povchanged, this._onPerspectiveChange);

            // Activating the cover appears to be the best way to "clean up" Mapillary.
            // https://github.com/mapillary/mapillary-js/blob/8b6fc2f36e3011218954d95d601062ff6aa41ad9/src/viewer/ComponentController.ts#L184-L192
            this.mapillary.activateCover();

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._unsyncMaps();
        }

        this._mapillary = instance;

        // A new instance is being set - add the event handlers.
        if (instance) {
            const syncMaps = async (node: Node) => {
                if (node.merged) {
                    // Remove this handler
                    this.mapillary.off(Viewer.nodechanged, syncMaps);

                    this._currentNodePosition = node.latLon;

                    // Wait for initial sync
                    await this._syncMaps();

                    // Listen for changes to the currently displayed mapillary node
                    this.mapillary.on(Viewer.nodechanged, this._onNodeChange);

                    // Handle further pov changes on this node
                    this.mapillary.on(
                        Viewer.povchanged,
                        this._onPerspectiveChange
                    );
                }
            };

            // Wait for the first mapillary node to be ready before attempting
            // to sync the maps
            this.mapillary.on(Viewer.nodechanged, syncMaps);
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
            void this._unsyncMaps();
        }

        this._map = instance;

        // A new instance is being set - sync the map.
        if (instance) {
            void this._syncMaps();
        }
    }

    /**
     * Setup the initial state of the maps such as the location marker and map
     * position.
     */
    private async _syncMaps(): Promise<void> {
        if (!this.map || !this.mapillary) {
            return;
        }

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
            }),
            this.messages.commands.map.zoomToViewpoint.execute({
                maps: this.map,
                viewpoint: {
                    rotation: getCameraRotationFromBearing(heading),
                    targetGeometry: centerPoint,
                    scale: 3000,
                },
            }),
        ]);
    }

    private async _unsyncMaps(): Promise<void> {
        await this.messages.commands.locationMarker.remove.execute({
            id: this.id,
            maps: this.map,
        });
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
        if (!this.map || !this.mapillary) {
            return;
        }

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

        await Promise.all([
            this.messages.commands.locationMarker.update.execute({
                geometry: centerPoint,
                heading,
                tilt,
                fov,
                id: this.id,
                maps: this.map,
            }),
            this.messages.commands.map.zoomToViewpoint.execute({
                maps: this.map,
                viewpoint: {
                    rotation: getCameraRotationFromBearing(heading),
                    targetGeometry: centerPoint,
                    scale: 3000,
                },
            }),
        ]);
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
}
