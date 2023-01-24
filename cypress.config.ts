import { defineConfig } from "cypress";

export default defineConfig({
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    numTestsKeptInMemory: 0,
    video: false,
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
