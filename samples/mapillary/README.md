# Embedded Third-party Map

This sample demonstrates how to embed and facilitate bi-directional communication with a third-party map technology. In this sample we've embedded [Mapillary](https://www.mapillary.com/) to present street-level imagery alongside the Geocortex Map component.

The [model in this sample](src/components/EmbeddedMap/EmbeddedMapModel.ts) initializes the Mapillary viewer by referencing their [mapillary-js JavaScript library](https://github.com/mapillary/mapillary-js) that was installed as a [project dependency](package.json) of this sample.

The Geocortex Map component is controlled by using the [`map.zoom-to-viewpoint`](https://developers.geocortex.com/docs/web/api-commands-operations-events#command-map.zoom-to-viewpoint) and [`location-marker.*`](https://developers.geocortex.com/docs/web/api-commands-operations-events#command-location-marker.create) commands in response to events from the Mapillary viewer.
