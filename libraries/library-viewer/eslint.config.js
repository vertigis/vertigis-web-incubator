import { defineConfig, globalIgnores } from "eslint/config";
import baseConfig from "@vertigis/web-sdk/config/eslint.config.js";

export default defineConfig([
    globalIgnores(["**/*.js", "**/*.d.ts"]),
    baseConfig,
    {
        // Add your custom rules or other eslint config overrides here.
        rules: {},
    },
]);
