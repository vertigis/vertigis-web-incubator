# Mapillary Component

The `Mapillary` component in this library renders a [Mapillary](https://www.mapillary.com/) viewer and facilitates bi-directional communication with the rest of the VertiGIS Studio Web application. In this sample we've used Mapillary to present street-level imagery alongside the Geocortex Map component.

The [component model](src/components/Mapillary/MapillaryModel.ts) initializes the Mapillary viewer by referencing their [mapillary-js JavaScript library](https://github.com/mapillary/mapillary-js) that was installed as a [project dependency](package.json) of this sample.

The Geocortex Map component in the sample is controlled using the [`map.zoom-to-viewpoint`](https://developers.geocortex.com/docs/web/api-commands-operations-events#command-map.zoom-to-viewpoint) and [`location-marker.*`](https://developers.geocortex.com/docs/web/api-commands-operations-events#command-location-marker.create) commands in response to events from the Mapillary viewer.
