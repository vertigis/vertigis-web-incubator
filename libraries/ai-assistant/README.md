# EagleView Embedded Explorer

The `EagleView` component in this library renders an [Embedded Explorer](https://embedded-explorer.eagleview.com/static/docs/) control.

The [component](src/components/EmbeddedExplorer/EagleView.tsx) initializes the embedded explorer and acts as a wrapper so it can be placed anywhere in a VertiGIS Studio Web application. It will sync the current position of the Web applications map with the location of the embedded explorer so that changes in either map will be reflected int the other view.

The VertiGIS Studio Map component in the sample instantiates a sample VertiGIS Studio Web application with an EagleView component pre-configured.

Please [see this article](https://support.vertigis.com/hc/en-us/articles/28311610134418-Add-Eagleview-Explorer-to-VertiGIS-Studio-Web) for instructions on deploying the EagleView Embedded Explorer component for VertiGIS Studio Web.
