import defaultWebpackConfig, {
    merge,
} from "@vertigis/web-sdk/config/webpack.config.js";

export default merge(defaultWebpackConfig, {
    module: {
        rules: [
            {
                test: /(\.md|\.xml)$/i,
                type: "asset/source",
            },
        ],
    },
    resolve: {
        fallback: {
            buffer: false,
            timers: false,
            stream: false,
        },
    },
});
