# Basic Component

This sample demonstrates how to create a basic VertiGIS Studio Web layout component with an associated model. To learn more about creating components using the SDK, see our documentation in the [Developer Center](https://developers.vertigisstudio.com/docs/web/sdk-components-overview/).

The [layout component in this sample](src/components/BasicComponent/BasicComponent.tsx) uses a Button provided by the VertiGIS Studio Web React UI library, which ensures the behavior and styling matches the [theme configuration](https://developers.vertigisstudio.com/docs/web/configuration-theme/) of the application, including light and dark themes and custom accent colors.

The layout component is associated with a corresponding [component model](src/components/BasicComponent/BasicComponentModel.ts). This model provides a place to store state that the layout component can reference. The model is also able to serialize and deserialize configuration from [app config](https://developers.vertigisstudio.com/docs/web/configuration-app-config-getting-started/).
