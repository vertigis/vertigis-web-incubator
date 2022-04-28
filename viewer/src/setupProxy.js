// @ts-check
const http = require("http");
const https = require("https");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Using keepAlive drastically improves the response times for this proxy,
// especially when being hammered with many requests at once such as the initial
// load of the viewer.
// https://github.com/nodejitsu/node-http-proxy/issues/1058
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const viewerUrl = process.env.REACT_APP_VIEWER_URL;

module.exports = function (app) {
    app.use(
        "/viewer",
        createProxyMiddleware({
            target: viewerUrl,
            agent: viewerUrl.startsWith("https") ? httpsAgent : httpAgent,
            changeOrigin: true,
            pathRewrite: {
                // Strip /viewer from path so it isn't forwarded to the target
                // /viewer/index.html => /index.html => https://apps.vertigisstudio.com/web/index.html
                "^/viewer": "/",
            },
        })
    );
};
