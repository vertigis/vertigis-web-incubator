# CLAUDE.md

## Key Rules

-   Do not run a command unless the user asks for it. Example: do not build or test after a change.
-   Do not add a dependency unless the user asks for it.
-   Obey the rules in this file also when the existing code does not. The rules are always correct.
-   Write all messages in ASD-STE100 Simplified Technical English. You can use technical names and verbs from the code.
    Examples: `React`, `ESLint`, `yarn`, file names, and function names.

## The Repository

This repository is the VertiGIS Studio Web Component Incubator. It holds experimental custom libraries for VertiGIS
Studio Web, and a viewer that shows each library as a live sample at https://vertigis-web-incubator.netlify.app.

-   It is a Yarn 4 monorepo. The workspaces are in `libraries/*`. `viewer/` is not a workspace. `viewer/` holds a local
    preview of the live sample viewer.
-   Each directory in `libraries/` is a Web SDK project (`@vertigis/web-sdk`).

-   The sample libraries are:

    -   `3d-tools`: A selection of ESRI widgets for working with 3d data.
    -   `ai-assistant`: An ESRI webcomponent that lets you query your data with an AI agent.
    -   `eagle-view-viewer`: Integration of 3rd party Eagle View imagery with Web.
    -   `mapillary`: Integration of 3rd party Mapillary imagery with Web.
    -   `timeslider`: Integration of an ESRI timeslider component with Web.

-   The structure of a library:

    -   `src/index.ts` registers the components, models, commands, and language resources with the `LibraryRegistry`.
    -   `src/components/<Name>/` holds `<Name>.tsx`, `<Name>Model.ts`, `index.ts`, and optionally `designer.ts`.
    -   `src/locale/inv.json` holds the language strings.
    -   `app/app.json` and `app/layout.xml` are the configuration and layout of the library app.
    -   `README.md` is the text that the viewer shows below the sample.

-   `libraries/library-viewer` is the sample viewer. It is also a Web SDK project. Its `app/app.json` lists the
    libraries in the viewer. It imports `app/app.json`, `app/layout.xml`, `README.md`, and `build/main.js` of each
    library with a relative path. Then it merges them into its own app at runtime. Thus the viewer needs the built
    libraries.
-   `viewer/build/` is the Netlify output. Only `index.html`, `_headers`, and `_redirects` are source. Do not edit the
    other files.
-   The `build/` directories are build output. Git ignores them. Do not edit them.
-   `scripts/copy-static-files.js` copies the libraries in `libraries/library-viewer/app/app.json` to `viewer/build` and
    is a prerequisite to running `yarn preview`. This script will be run automatically by `yarn build`.

## Commands

Run all commands from the root of the repository. The `yarn` version comes from Corepack.

-   `yarn`: install the dependencies.
-   `yarn build`: build all libraries, then the viewer, then copy the output to `viewer/build`.
-   `yarn build:libraries`: build all libraries except `library-viewer`.
-   `yarn start`: start the viewer on port 3001. Run `yarn build:libraries` first.
-   `yarn workspace <name> start`: start one library on port 3001. `<name>` is the `name` in the `package.json` of the
    library. Example: `yarn workspace library-mapillary start`.
-   `yarn test`: start the viewer and run the Cypress tests in Chrome. Run `yarn build:libraries` first.
-   `yarn test:watch`: start the viewer and open the Cypress UI.
-   `yarn preview`: serve `viewer/build` on port 3008, as Netlify does. Run `yarn build` first.
-   `yarn prettier`: format all `.ts`, `.tsx`, `.js`, `.json`, and `.md` files.
-   `yarn audit`: audit the dependencies of all workspaces.
-   The pre-commit hook runs `prettier` on the staged files.

## Code Rules

-   Write TypeScript and React function components.
-   Import Web APIs from `@vertigis/web/*`. Import UI components from `@vertigis/web/ui/<Name>`. Import ArcGIS APIs from
    `@arcgis/core/*`. Do not import from MUI or `@vertigis/react-ui` directly.
-   The rules for writing code in Web also apply to these samples, eg:
    -   A model extends `ComponentModelBase` and has the `@serializable` decorator. Add each config property to the
        `<Name>ModelProperties` interface and to `_getSerializableProperties()`.
    -   A service extends `ServiceBase`. Register it with `registerService`. Register its commands and operations with
        `registerCommand` and `registerOperation` and the `serviceId` of the service.
    -   Use the `@command`, `@operation`, and `@canExecute` decorators from `@vertigis/web/messaging` to implement
        commands and operations.
    -   Use `useWatchAndRerender` to render a component again when a model property changes.
    -   Put all user-visible text in `src/locale/inv.json`. Register the file for the `inv` and `en` locales.
    -   Use the key `language-web-incubator-<library>-<text>` for UI text. Use the keys
        `language-designer-<library>-<setting>-title` and `language-designer-<library>-<setting>-description` for
        Designer settings.
    -   In `designer.ts`, call the base `*ComponentModelDesignerSettings*` functions from `@vertigis/web/designer`
        first.
    -   The `namespace` in `registerComponent` must be the same as the `xmlns` of the custom prefix in `app/layout.xml`.
        Use `your.custom.namespace` in new samples.
-   Attempt to keep the versions of `@vertigis/web`, `@vertigis/web-sdk`, and `typescript` the same in all libraries.

-   If a sample has dependencies that would bring in a separate version of ESRI's JSAPI than used in the others OR
    requires local packages for some other reason

    -   add `"installConfig": { "hoistingLimits": "workspaces" }` to that sample's `package.json`.
    -   This prevents the extra version of ESRI's JSAPI from affecting other samples and preventing builds from
        completing.
    -   Note however that at runtime everything will be using the same version from Web, so it still might not be
        compatible.

-   Obey `.prettierrc` and the `eslint.config.js` of each library.

-   To add a library:

    1. Copy a library directory. Change the `name` in `package.json` to `library-<directory>`.
    2. Add the directory name as an `id`, and a `title`, to the `libraries` list in
       `samples/library-viewer/app/app.json`.
    3. Add a Cypress test in `cypress/e2e/<directory>.cy.ts`.

-   Write PR titles in the Conventional Commits format. Example: `fix: update to latest Web SDK`. PRs go to `master`.
    This repo isn't versioned but do this anyway.
-   The samples themselves have versions that should be manually updated (following semantic versioning) if changes are
    made to the sample itself.

## Tests

-   The Cypress end-to-end tests are in `cypress/e2e/<name>.cy.ts`. Only `mapillary` and the viewer have tests.
-   The tests open the viewer at `http://localhost:3001/#<library>`. The library is in an `iframe`.
-   The custom commands are in `cypress/support/commands.js`, and their types are in `cypress/support/index.d.ts`. Use
    `cy.getViewer().getMap()` to get the map. The map helpers are in `cypress/mapUtils.ts`.
-   There are no unit tests.
-   CI (`.github/workflows/ci.yml`) runs `yarn`, `yarn build`, and `yarn test` for each PR to `main`.

## Auditing

-   Run `yarn run audit` before merging a PR and deal with the failures as much as is possible.
-   Audit failures will NOT fail the build but it's easier to deal with them in a PR, rather than later with dependabot.
