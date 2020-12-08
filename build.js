const spawn = require("cross-spawn");
const fs = require("fs");
const path = require("path");

const samplesRootDir = path.join(__dirname, "samples");

const sampleDirs = fs
    .readdirSync(samplesRootDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && dirent.name !== "node_modules")
    .map((dirent) => path.join(samplesRootDir, dirent.name));

const checkSpawnSyncResult = (syncResult) => {
    if (syncResult.status !== 0) {
        process.exit(1);
    }
};

for (const sampleDir of sampleDirs) {
    console.log("Building sample: ", sampleDir);
    checkSpawnSyncResult(
        spawn.sync("yarn", ["build"], {
            cwd: sampleDir,
            stdio: "inherit",
        })
    );
}
