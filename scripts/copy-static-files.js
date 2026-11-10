const { execSync } = require("child_process");
const viewerAppConfig = require("../libraries/library-viewer/app/app.json");

// Use the same list of libraries as the library viewer.
const libraries = viewerAppConfig.items
    .filter((item) => item.$type === "library-viewer-model")
    .flatMap((item) => item.libraries.map((library) => library.id));

// Run each command in sequence, and stop the build if a command fails.
const run = (command) => execSync(command, { stdio: "inherit" });

run("shx cp -r ./libraries/library-viewer/{app,build}/* ./viewer/build");

for (const library of libraries) {
    run(`shx mkdir -p ./viewer/build/${library}`);
    run(`shx cp -r ./libraries/${library}/{app,build,README.md} ./viewer/build/${library}`);
}
