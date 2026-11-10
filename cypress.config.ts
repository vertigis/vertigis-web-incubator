import { defineConfig } from "cypress";

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 45000,
    modifyObstructiveCode: false,
    responseTimeout: 45000,
    retries: {
        runMode: 3,
    },
    numTestsKeptInMemory: 0,
    video: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require("./cypress/plugins/index.js")(on, config);
        },
    },
});
