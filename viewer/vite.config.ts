import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import babel from "vite-plugin-babel";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default ({ mode }) => {
    const { VITE_APP_VIEWER_URL } = loadEnv(mode, "../env");
    return defineConfig({
        assetsInclude: ["**/*.xml", "**/*.md"],
        base: "./",
        define: {
            "process.env": { VITE_APP_VIEWER_URL },
        },
        plugins: [
            // The amd viewer modules must be transpiled, first to commonjs
            // and then to es6, before they can be loaded by vite.
            babel({
                include: [/main.js$/],
                babelConfig: {
                    plugins: ["transform-amd-to-commonjs"],
                },
            }),
            commonjs({
                filter: (id) => id.includes("main.js"),
            }),
            react(),
        ],
        resolve: {
            alias: {
                "@vertigis/web": "./node_modules/@vertigis/web",
            },
        },
        server: {
            open: true,
            port: 3003,
            proxy: {
                "/web": {
                    target: VITE_APP_VIEWER_URL,
                    changeOrigin: true,
                    rewrite: (path) => path?.replace(/^\/web/, ""),
                    secure: false,
                },
            },
        },
        build: {
            rollupOptions: {
                // These are the packages declared as external
                // dependencies in the vertigis-web-sdk build script.
                external: [
                    /^@arcgis\/core\/.+$/,
                    /^esri\/.+$/,
                    /^@vertigis\/.+$/,
                    /^react(\/.+)*$/,
                    /^react-dom(\/.+)*$/,
                ],
            },
        },
    });
};
