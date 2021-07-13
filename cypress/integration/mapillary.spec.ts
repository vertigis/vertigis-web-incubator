import { getMapOrSceneView } from "../mapUtils";

const sampleName = "mapillary";

// Although we provide the exact number from the street view position when
// setting the map center position, the reported map center will not be exactly
// the same.
const mapCenterPrecision = 1e-3;
const markerCenterPrecision = 1e-3;

const expectMapAndMarkerCenter = (lat: number, lon: number) =>
    cy
        .getViewer()
        .getMap()
        .should((mapEl) => {
            const mapView = getMapOrSceneView(mapEl);

            // Check map center
            expect(mapView.center.latitude).to.be.closeTo(
                lat,
                mapCenterPrecision
            );
            expect(mapView.center.longitude).to.be.closeTo(
                lon,
                mapCenterPrecision
            );

            // Check location marker center
            const locationMarker = mapView.map.allLayers
                .find(
                    (layer: any) =>
                        layer.id === "__GCX_MAP_CONTEXT_AND_GEOLOCATION"
                )
                .graphics.getItemAt(0);
            expect(locationMarker.geometry.latitude).to.be.closeTo(
                lat,
                markerCenterPrecision
            );
            expect(locationMarker.geometry.longitude).to.be.closeTo(
                lon,
                markerCenterPrecision
            );
        });

// TODO: Temporarily disabled as this scene does not currently render on the
// GitHub agents.
xdescribe(sampleName, () => {
    it("synchronizes marker position with street view position", () => {
        cy.visit(`http://localhost:3000/${sampleName}`);

        // The following test depends on the web scene being used and the current
        // state of the mapillary database.

        // Marker is set initially to match street view position.
        expectMapAndMarkerCenter(51.908070806028164, 4.486175772780554);

        // Find the forward arrow by querying for the mapillary node id that
        // represents the next node in the forward direction.
        cy.getViewer().find('[data-key="f_wCfca88pFHl-CM1EKtLg"]').click();

        // Marker is updated to match new street view position.
        expectMapAndMarkerCenter(51.908175485049426, 4.4862970380600515);
    });
});
