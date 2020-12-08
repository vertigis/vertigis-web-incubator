# Geocortex Web Component Incubator

![CI](https://github.com/geocortex/vertigis-web-incubator/workflows/CI/badge.svg)

View the samples at [https://vertigis-web-incubator.netlify.app](https://vertigis-web-incubator.netlify.app).

This project includes a collection of samples that demonstrates how to configure and customize [Geocortex Web](https://www.geocortex.com/products/gxw/) apps using the [Geocortex Web SDK](https://developers.geocortex.com/docs/web/sdk-overview/). Before diving into the SDK, be sure to check out our [Developer Center](https://developers.geocortex.com/docs/web/overview/) to learn the various concepts of building and configuring Geocortex Web applications. There is a surprising amount that can be accomplished through [layout](https://developers.geocortex.com/docs/web/configuration-layout-getting-started/), [app config](https://developers.geocortex.com/docs/web/configuration-app-config-getting-started/), and [Geocortex Workflow](https://www.geocortex.com/products/geocortex-workflow/) which can be [configured in the app config](https://developers.geocortex.com/docs/web/tutorial-run-workflow-app-config/) without even needing to use the SDK!

Check out the [hosted samples viewer](https://vertigis-web-incubator.netlify.app/) for an easy way to run the samples in your browser without needing to run the project locally. The source for each sample is located within the [samples](samples) directory of this project.

## Running the Samples locally

You will need to install the latest LTS version of [Node.js](https://nodejs.org/).

### Installing dependencies

You can install the dependencies for all sample projects by running [`yarn`](https://yarnpkg.com/) at the root of this repository. The easiest way to install and update yarn is to run `npm install -g yarn`.

Alternatively you may install the dependencies for a single sample project by running `yarn` or `npm install` in the root of a sample directory.

### Running a sample

Run `yarn start` or `npm start` within the root of a sample directory. For example you can run the `i18n` sample by running `yarn start` within the [samples/i18n](samples/i18n) directory. This will launch the Geocortex Web SDK development server.

### Creating a new sample

Each sample follows the same pattern as the Geocortex Web SDK. The easiest way to create a new sample is to copy an existing sample directory, and rename the `name` property in the `package.json` of your sample to suit. Once created you will need to add your sample to the samples viewer `samples` array in [the viewer source](viewer/src/App.tsx) to have it show up in the list of samples.

### Testing

The tests for each sample are located in the [cypress/integration](cypress/integration) directory.

The samples will need to be built prior to running the test using `yarn build:samples`. You can run the tests in interactive watch mode using `yarn test:watch`, or run all of the tests using `yarn test` from the root of this project.

### Running the Samples Viewer Locally

To run the samples viewer, first build all of the sample projects by running `yarn build:samples` in the root of this project, followed by running `yarn start` to start the viewer.

## Documentation

You can learn more on the [Geocortex Developer Center](https://developers.geocortex.com/docs/web/overview/).
