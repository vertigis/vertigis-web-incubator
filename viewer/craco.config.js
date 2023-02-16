module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve.alias = {
                ...webpackConfig.resolve.alias,
                // Starting with v5.10, MUI moved their ESM compiled code into a
                // /esm subfolder. They added a "module" entrypoint to package.json
                // that points to esm/index.js, but webpack will still resolve
                // individual modules to the root, which are CJS/ES5. This will
                // prevent default exports from resolving correctly at runtime.
                "@mui/material": "@mui/material/esm",
            };

            // Since react-ui has "type": "module" in its package.json we need this.
            // https://stackoverflow.com/questions/67729896/react-wont-be-loaded-with-webpack-5-but-in-4
            webpackConfig.module.rules.push({
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            });

            // Silence annoying source map errors coming from 3rd party libs.
            webpackConfig.ignoreWarnings = [
                ...(webpackConfig.ignoreWarnings ?? []),
                function ignoreSourceMapsLoaderWarnings(warning) {
                    return (
                        warning.module &&
                        warning.module.resource.includes("node_modules") &&
                        warning.details &&
                        warning.details.includes("source-map-loader")
                    );
                },
            ];

            return webpackConfig;
        },
    },
};
