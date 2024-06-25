const express = require("express");
const path = require("path");
const http = require("http");
const https = require("https");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const viewerUrl = "https://apps.vertigisstudio.com/web";

app.use("/", express.static(path.join(__dirname, "/viewer/build")));
app.use(
    "/viewer",
    createProxyMiddleware({
        target: viewerUrl,
        agent: viewerUrl.startsWith("https")
            ? new https.Agent({ keepAlive: true })
            : new http.Agent({ keepAlive: true }),
        changeOrigin: true,
        pathRewrite: {
            "^/viewer": "/",
        },
    })
);

app.listen(3008);
console.log("Listening on port 3008");
