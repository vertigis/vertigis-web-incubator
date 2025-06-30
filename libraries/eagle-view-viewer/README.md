# Time Slider Component

The `Eagle View` component in this library renders an [Embedded Explorer](https://embedded-explorer.eagleview.com/static/docs/) control.

The [component](src/components/EmbeddedExplorer/EagleView.tsx) initializes the embedded explorer and acts as a wrapper so it can be placed anywhere in a VertiGIS Studio Web application. It will sync the current position of the Web applications map with the location of the embedded explorer so that changes in either map will be reflected int the other view.

The VertiGIS Studio Map component in the sample instantiates a sample VertiGIS Studio Web application with a Eagle View component pre-configured.
