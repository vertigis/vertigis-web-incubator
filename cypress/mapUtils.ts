export function getMapOrSceneView(mapEl: JQuery<HTMLDivElement>) {
    const mapId = mapEl[0].getAttribute("data-layout-id")!;
    const win = mapEl[0].ownerDocument?.defaultView! as any;

    return win.__maps[mapId] || win.__scenes[mapId];
}

export function expectMapToBeStationary(mapEl: JQuery<HTMLDivElement>) {
    const map = getMapOrSceneView(mapEl);
    expect(map.stationary).to.be.true;
}

export function getCurrentViewpoint(mapEl: JQuery<HTMLDivElement>) {
    const map = getMapOrSceneView(mapEl);
    return map.viewpoint.toJSON();
}
