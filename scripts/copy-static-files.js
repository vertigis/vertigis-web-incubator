const { exec } = require("child_process");

const libraries = ["mapillary", "timeslider", "3d-tools"];

exec("shx cp -r ./libraries/library-viewer/{app,build}/* ./viewer/build");

libraries.forEach((library) => {
    exec(`shx mkdir -p ./viewer/build/${library}`);
    exec(
        `shx cp -r ./libraries/${library}/{app,build,README.md} ./viewer/build/${library}`
    );
});
