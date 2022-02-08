# VertiGIS Studio Web Component Incubator

![CI](https://github.com/geocortex/vertigis-web-incubator/workflows/CI/badge.svg)

View the component libraries live samples at [https://vertigis-web-incubator.netlify.app](https://vertigis-web-incubator.netlify.app).

This project includes a collection of [VertiGIS Studio Web](https://vertigisstudio.com/products/vertigis-studio-web/) component libraries built using the [VertiGIS Studio Web SDK](https://developers.geocortex.com/docs/web/sdk-overview/). Check out the [live samples](https://vertigis-web-incubator.netlify.app/) for an easy way to preview and download the component libraries in your browser without needing to run the project locally. The source for each library is located within the [libraries](libraries) directory of this project.

**These component libraries are experimental and provided free of charge without warranty under the [MIT license](LICENSE).** We will do our best to keep them functional and up-to-date. If you need assistance to modify or improve these libraries, feel free to reach out to our [professional services department](https://vertigisstudio.com/support-services/professional-services/).

## Using the component libraries in your app

The easiest way to use these component libraries in your VertiGIS Studio Web apps, is by using the _Download this library_ link in the [live samples viewer](https://vertigis-web-incubator.netlify.app/). Once the component library you'd like to use has been downloaded, you can [follow the steps](https://developers.geocortex.com/docs/web/sdk-deployment#uploading-custom-code-to-an-app) on the Geocortex Developer Center to use the _Upload Library_ feature in the VertiGIS Studio Web Designer.

## Running the libraries locally

You will need to install the latest LTS version of [Node.js](https://nodejs.org/).

### Installing dependencies

You can install the dependencies for all sample projects by running [`yarn`](https://yarnpkg.com/) at the root of this repository. The easiest way to install and update yarn is to run `npm install -g yarn`.

Alternatively you may install the dependencies for a single sample project by running `yarn` or `npm install` in the root of a sample directory.

### Running a library

Run `yarn start` or `npm start` within the root of a sample directory. For example you can run the `mapillary` sample by running `yarn start` within the [libraries/mapillary](libraries/mapillary) directory. This will launch the VertiGIS Studio Web SDK development server.

### Creating a new library

Each sample follows the same pattern as the VertiGIS Studio Web SDK. The easiest way to create a new sample is to copy an existing sample directory, and rename the `name` property in the `package.json` of your sample to suit. Once created you will need to add your sample to the samples viewer `libraries` array in [the viewer source](viewer/src/App.tsx) to have it show up in the list of libraries.

### Testing

The tests for each sample are located in the [cypress/integration](cypress/integration) directory.

The libraries will need to be built prior to running the test using `yarn build:libraries`. You can run the tests in interactive watch mode using `yarn test:watch`, or run all of the tests using `yarn test` from the root of this project.

### Running the Samples Viewer Locally

To run the samples viewer, first build all of the sample projects by running `yarn build:libraries` in the root of this project, followed by running `yarn start` to start the viewer.

## Documentation

Before diving into the VertiGIS Studio Web SDK, be sure to check out our [Developer Center](https://developers.geocortex.com/docs/web/overview/) to learn the various concepts of building and configuring VertiGIS Studio Web applications. There is a surprising amount that can be accomplished through [layout](https://developers.geocortex.com/docs/web/configuration-layout-getting-started/), [app config](https://developers.geocortex.com/docs/web/configuration-app-config-getting-started/), and [VertiGIS Studio Workflow](https://vertigisstudio.com/products/vertigis-studio-workflow/) which can be [configured in the app config](https://developers.geocortex.com/docs/web/tutorial-run-workflow-app-config/) without even needing to use the SDK!
