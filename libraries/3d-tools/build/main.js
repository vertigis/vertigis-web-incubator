define([
    "react/jsx-runtime",
    "react",
    "@vertigis/web/ui/esriUtils",
    "@vertigis/web/ui/Link",
    "@arcgis/core/widgets/DirectLineMeasurement3D",
    "@vertigis/web/ui",
    "@arcgis/core/widgets/Slice",
    "@arcgis/core/widgets/ShadowCast",
    "@arcgis/core/widgets/LineOfSight",
    "@vertigis/web/models",
    "@vertigis/web/designer",
    "@arcgis/core/widgets/ElevationProfile",
    "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineGround",
    "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineInput",
    "@arcgis/core/widgets/ElevationProfile/ElevationProfileLineView",
    "@arcgis/core/widgets/Daylight",
    "@arcgis/core/widgets/AreaMeasurement3D",
    "@vertigis/web/branding",
], (e, t, i, o, n, a, l, s, r, d, g, c, p, u, f, h, m, y) =>
    (() => {
        "use strict";
        var w = {
                227: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            AreaMeasurementModel: () => m,
                            default: () => p,
                        });
                    var o = i(308),
                        n = i(959),
                        a = i(817),
                        l = i(956),
                        s = i(710),
                        r = i.n(s),
                        d = i(336),
                        g = i.n(d);
                    const c = (0, l.createEsriMapWidget)(g(), !0, !0);
                    function p(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [l, s] = (0, n.useState)();
                        return (
                            (0, a.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, a.useWatchAndRerender)(l?.viewModel, "state"),
                            (0, n.useEffect)(() => {
                                l && (l.label = t.title);
                            }, [l, t.title]),
                            "map" === i.viewMode
                                ? null
                                : (0, o.jsx)(c, {
                                      onWidgetCreated: s,
                                      ...e,
                                      sx: { pb: 2 },
                                      children:
                                          "measured" === l?.viewModel?.state &&
                                          (0, o.jsx)(r(), {
                                              sx: { m: 2, cursor: "pointer" },
                                              onClick: () =>
                                                  l.viewModel.clear(),
                                              children:
                                                  "language-web-incubator-common-clear",
                                          }),
                                  })
                        );
                    }
                    var u = i(65),
                        f = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let h = class extends u.ComponentModelBase {
                        map;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-area-measurement-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                            };
                        }
                    };
                    f(
                        [(0, u.importModel)("map-extension")],
                        h.prototype,
                        "map",
                        void 0
                    ),
                        (h = f([u.serializable], h));
                    const m = h;
                },
                942: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            DaylightModel: () => h,
                            applySettings: () => y,
                            default: () => c,
                            getSettings: () => w,
                            getSettingsSchema: () => b,
                        });
                    var o = i(308),
                        n = i(959),
                        a = i(956),
                        l = i(326),
                        s = i.n(l),
                        r = i(817);
                    const d = (0, a.createEsriMapWidget)(s(), !0, !0),
                        g = (0, r.styled)(d)({
                            "--calcite-ui-text-1": "var(--primaryForeground)",
                            "& .esri-widget": { width: "100%" },
                        });
                    function c(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [a, l] = (0, n.useState)();
                        return (
                            (0, r.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, r.useWatchAndRerender)(t, [
                                "title",
                                "datePicker",
                                "playButtons",
                                "shadowsToggle",
                                "timezone",
                                "dateOrSeason",
                                "playSpeedMultiplier",
                            ]),
                            (0, n.useEffect)(() => {
                                a &&
                                    ((a.visibleElements = {
                                        datePicker: t.datePicker,
                                        playButtons: t.playButtons,
                                        shadowsToggle: t.shadowsToggle,
                                        timezone: t.timezone,
                                    }),
                                    (a.label = t.title),
                                    (a.dateOrSeason = t.dateOrSeason),
                                    (a.playSpeedMultiplier =
                                        t.playSpeedMultiplier));
                            }, [
                                a,
                                t,
                                t.title,
                                t.datePicker,
                                t.playButtons,
                                t.shadowsToggle,
                                t.timezone,
                                t.dateOrSeason,
                                t.playSpeedMultiplier,
                            ]),
                            "map" === i.viewMode
                                ? null
                                : (0, o.jsx)(g, { onWidgetCreated: l, ...e })
                        );
                    }
                    var p = i(65),
                        u = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let f = class extends p.ComponentModelBase {
                        map;
                        playButtons;
                        shadowsToggle;
                        datePicker;
                        timezone;
                        dateOrSeason;
                        playSpeedMultiplier;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                playButtons: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                shadowsToggle: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                datePicker: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                timezone: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                dateOrSeason: {
                                    serializeModes: ["initial"],
                                    default: "date",
                                },
                                playSpeedMultiplier: {
                                    serializeModes: ["initial"],
                                    default: 1,
                                },
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-daylight-widget-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                            };
                        }
                    };
                    u(
                        [(0, p.importModel)("map-extension")],
                        f.prototype,
                        "map",
                        void 0
                    ),
                        (f = u([p.serializable], f));
                    const h = f;
                    var m = i(622);
                    const y = async (e) => {
                            const { model: t, settings: i } = e;
                            await (0, m.applyComponentModelDesignerSettings)(e),
                                t.assignProperties(i);
                        },
                        w = async (e) => {
                            const { model: t } = e,
                                {
                                    playButtons: i,
                                    shadowsToggle: o,
                                    datePicker: n,
                                    timezone: a,
                                    dateOrSeason: l,
                                    playSpeedMultiplier: s,
                                } = t;
                            return {
                                ...(await (0,
                                m.getComponentModelDesignerSettings)(e)),
                                playButtons: i,
                                shadowsToggle: o,
                                datePicker: n,
                                timezone: a,
                                dateOrSeason: l,
                                playSpeedMultiplier: s,
                            };
                        },
                        b = async (e) => {
                            const t = await (0,
                            m.getComponentModelDesignerSettingsSchema)(e);
                            return (
                                (t.settings[0].settings =
                                    t.settings[0].settings.concat([
                                        {
                                            id: "playButtons",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-daylight-play-buttons-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-play-buttons-title",
                                        },
                                        {
                                            id: "shadowsToggle",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-daylight-shadows-toggle-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-shadows-toggle-title",
                                        },
                                        {
                                            id: "datePicker",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-daylight-date-picker-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-date-picker-title",
                                        },
                                        {
                                            id: "timezone",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-daylight-timezone-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-timezone-title",
                                        },
                                        {
                                            id: "playSpeedMultiplier",
                                            type: "number",
                                            description:
                                                "language-designer-3d-tools-daylight-play-speed-multiplier-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-play-speed-multiplier-title",
                                            isRequired: !0,
                                            min: 0,
                                        },
                                        {
                                            id: "dateOrSeason",
                                            type: "select",
                                            description:
                                                "language-designer-3d-tools-daylight-date-or-season-description",
                                            displayName:
                                                "language-designer-3d-tools-daylight-date-or-season-title",
                                            values: [
                                                {
                                                    displayName:
                                                        "language-designer-3d-tools-daylight-date-or-season-date",
                                                    value: "date",
                                                },
                                                {
                                                    displayName:
                                                        "language-designer-3d-tools-daylight-date-or-season-season",
                                                    value: "season",
                                                },
                                            ],
                                        },
                                    ])),
                                { ...t, settings: [...t.settings] }
                            );
                        };
                },
                680: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            ElevationProfileModel: () => b,
                            applySettings: () => M,
                            default: () => h,
                            getSettings: () => z,
                            getSettingsSchema: () => C,
                        });
                    var o = i(308),
                        n = i(959),
                        a = i(299),
                        l = i.n(a),
                        s = i(520),
                        r = i.n(s),
                        d = i(621),
                        g = i.n(d),
                        c = i(390),
                        p = i.n(c),
                        u = i(817);
                    const f = (0, i(956).createEsriMapWidget)(l(), !0, !0);
                    function h(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [a, l] = (0, n.useState)();
                        return (
                            (0, u.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, u.useWatchAndRerender)(t, [
                                "title",
                                "legend",
                                "chart",
                                "clearButton",
                                "settingsButton",
                                "sketchButton",
                                "selectButton",
                                "uniformChartScalingToggle",
                                "profileLineGround",
                                "profileLineInput",
                                "profileLineView",
                                "profileLineGroundColor",
                                "profileLineInputColor",
                                "profileLineViewColor",
                            ]),
                            (0, n.useEffect)(() => {
                                a &&
                                    ((a.label = t.title),
                                    (a.visibleElements = {
                                        legend: t.legend,
                                        chart: t.chart,
                                        clearButton: t.clearButton,
                                        settingsButton: t.settingsButton,
                                        sketchButton: t.sketchButton,
                                        selectButton: t.selectButton,
                                        uniformChartScalingToggle:
                                            t.uniformChartScalingToggle,
                                    }),
                                    a.profiles.removeAll(),
                                    t.profileLineGround &&
                                        a.profiles.add(
                                            new (r())({
                                                color: t.profileLineGroundColor,
                                            })
                                        ),
                                    t.profileLineInput &&
                                        a.profiles.add(
                                            new (g())({
                                                color: t.profileLineInputColor,
                                            })
                                        ),
                                    t.profileLineView &&
                                        a.profiles.add(
                                            new (p())({
                                                color: t.profileLineViewColor,
                                            })
                                        ));
                            }, [
                                a,
                                t.title,
                                t.profileLineGround,
                                t.profileLineInput,
                                t.profileLineView,
                                t.legend,
                                t.chart,
                                t.clearButton,
                                t.settingsButton,
                                t.sketchButton,
                                t.selectButton,
                                t.uniformChartScalingToggle,
                                t.profileLineGroundColor,
                                t.profileLineInputColor,
                                t.profileLineViewColor,
                            ]),
                            "map" === i.viewMode
                                ? null
                                : (0, o.jsx)(f, { onWidgetCreated: l, ...e })
                        );
                    }
                    var m = i(65),
                        y = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let w = class extends m.ComponentModelBase {
                        map;
                        legend;
                        chart;
                        clearButton;
                        settingsButton;
                        sketchButton;
                        selectButton;
                        uniformChartScalingToggle;
                        profileLineGround;
                        profileLineInput;
                        profileLineView;
                        profileLineGroundColor;
                        profileLineInputColor;
                        profileLineViewColor;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-elevation-profile-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                                legend: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                chart: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                clearButton: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                settingsButton: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                sketchButton: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                selectButton: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                uniformChartScalingToggle: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                profileLineGround: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                profileLineInput: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                profileLineView: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                profileLineGroundColor: {
                                    serializeModes: ["initial"],
                                    default: "#ff7f00",
                                },
                                profileLineInputColor: {
                                    serializeModes: ["initial"],
                                    default: "#00c8c8",
                                },
                                profileLineViewColor: {
                                    serializeModes: ["initial"],
                                    default: "#cf4ccf",
                                },
                            };
                        }
                    };
                    y(
                        [(0, m.importModel)("map-extension")],
                        w.prototype,
                        "map",
                        void 0
                    ),
                        (w = y([m.serializable], w));
                    const b = w;
                    var v = i(622),
                        S = i(568);
                    const M = async (e) => {
                            const { model: t, settings: i } = e,
                                {
                                    profileLineGroundColor: o,
                                    profileLineInputColor: n,
                                    profileLineViewColor: a,
                                    ...l
                                } = i;
                            await (0, v.applyComponentModelDesignerSettings)(e);
                            const s = l;
                            o &&
                                (s.profileLineGroundColor = (0, S.toColor)(
                                    o
                                )?.toCss()),
                                n &&
                                    (s.profileLineInputColor = (0, S.toColor)(
                                        n
                                    )?.toCss()),
                                a &&
                                    (s.profileLineViewColor = (0, S.toColor)(
                                        a
                                    )?.toCss()),
                                t.assignProperties(s);
                        },
                        z = async (e) => {
                            const { model: t } = e,
                                {
                                    legend: i,
                                    chart: o,
                                    clearButton: n,
                                    settingsButton: a,
                                    sketchButton: l,
                                    selectButton: s,
                                    uniformChartScalingToggle: r,
                                    profileLineGround: d,
                                    profileLineInput: g,
                                    profileLineView: c,
                                    profileLineGroundColor: p,
                                    profileLineInputColor: u,
                                    profileLineViewColor: f,
                                } = t;
                            return {
                                ...(await (0,
                                v.getComponentModelDesignerSettings)(e)),
                                legend: i,
                                chart: o,
                                clearButton: n,
                                settingsButton: a,
                                sketchButton: l,
                                selectButton: s,
                                uniformChartScalingToggle: r,
                                profileLineGround: d,
                                profileLineInput: g,
                                profileLineView: c,
                                profileLineGroundColor: (0, S.toColor)(
                                    p
                                ).toJSON(),
                                profileLineInputColor: (0, S.toColor)(
                                    u
                                ).toJSON(),
                                profileLineViewColor: (0, S.toColor)(
                                    f
                                ).toJSON(),
                            };
                        },
                        C = async (e) => {
                            const t = await (0,
                            v.getComponentModelDesignerSettingsSchema)(e);
                            return (
                                (t.settings[0].settings =
                                    t.settings[0].settings.concat([
                                        {
                                            id: "legend",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-legend-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-legend-title",
                                        },
                                        {
                                            id: "chart",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-chart-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-chart-title",
                                        },
                                        {
                                            id: "clearButton",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-clear-button-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-clear-button-title",
                                        },
                                        {
                                            id: "settingsButton",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-settings-button-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-settings-button-title",
                                        },
                                        {
                                            id: "sketchButton",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-sketch-button-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-sketch-button-title",
                                        },
                                        {
                                            id: "selectButton",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-select-button-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-select-button-title",
                                        },
                                        {
                                            id: "uniformChartScalingToggle",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-title",
                                        },
                                        {
                                            id: "profileLineGround",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-ground-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-ground-title",
                                        },
                                        {
                                            id: "profileLineGroundColor",
                                            type: "color",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-ground-color-title",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-ground-color-description",
                                            isVisible: (e) =>
                                                e.profileLineGround,
                                        },
                                        {
                                            id: "profileLineInput",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-input-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-input-title",
                                        },
                                        {
                                            id: "profileLineInputColor",
                                            type: "color",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-input-color-title",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-input-color-description",
                                            isVisible: (e) =>
                                                e.profileLineInput,
                                        },
                                        {
                                            id: "profileLineView",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-view-description",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-view-title",
                                        },
                                        {
                                            id: "profileLineViewColor",
                                            type: "color",
                                            displayName:
                                                "language-designer-3d-tools-elevation-profile-profile-line-view-color-title",
                                            description:
                                                "language-designer-3d-tools-elevation-profile-profile-line-view-color-description",
                                            isVisible: (e) => e.profileLineView,
                                        },
                                    ])),
                                { ...t, settings: [...t.settings] }
                            );
                        };
                },
                815: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            LineMeasurementModel: () => m,
                            default: () => p,
                        });
                    var o = i(308),
                        n = i(959),
                        a = i(956),
                        l = i(710),
                        s = i.n(l),
                        r = i(130),
                        d = i.n(r),
                        g = i(817);
                    const c = (0, a.createEsriMapWidget)(d(), !0, !0);
                    function p(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [a, l] = (0, n.useState)();
                        return (
                            (0, g.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, g.useWatchAndRerender)(a?.viewModel, "state"),
                            (0, n.useEffect)(() => {
                                a && (a.label = t.title);
                            }, [a, t.title]),
                            "map" === i.viewMode
                                ? null
                                : (0, o.jsx)(c, {
                                      onWidgetCreated: l,
                                      ...e,
                                      sx: { pb: 2 },
                                      children:
                                          "measured" === a?.viewModel?.state &&
                                          (0, o.jsx)(s(), {
                                              sx: { m: 2, cursor: "pointer" },
                                              onClick: () =>
                                                  a.viewModel.clear(),
                                              children:
                                                  "language-web-incubator-common-clear",
                                          }),
                                  })
                        );
                    }
                    var u = i(65),
                        f = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let h = class extends u.ComponentModelBase {
                        map;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-line-measurement-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                            };
                        }
                    };
                    f(
                        [(0, u.importModel)("map-extension")],
                        h.prototype,
                        "map",
                        void 0
                    ),
                        (h = f([u.serializable], h));
                    const m = h;
                },
                843: (e, t, i) => {
                    i.r(t),
                        i.d(t, { LineOfSightModel: () => h, default: () => c });
                    var o = i(308),
                        n = i(959),
                        a = i(64),
                        l = i.n(a),
                        s = i(817),
                        r = i(710),
                        d = i.n(r);
                    const g = (0, i(956).createEsriMapWidget)(l(), !0, !0);
                    function c(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [a, l] = (0, n.useState)();
                        if (
                            ((0, s.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, s.useWatchAndRerender)(a?.viewModel, "state"),
                            (0, n.useEffect)(() => {
                                a && (a.label = t.title);
                            }, [a, t.title]),
                            "map" === i.viewMode)
                        )
                            return null;
                        const r =
                            "creating" === a?.viewModel?.state ||
                            "created" === a?.viewModel?.state;
                        return (0, o.jsx)(g, {
                            onWidgetCreated: l,
                            ...e,
                            sx: { pb: 2 },
                            children:
                                r &&
                                (0, o.jsx)(d(), {
                                    sx: { m: 2, cursor: "pointer" },
                                    onClick: () => a.viewModel.clear(),
                                    children:
                                        "language-web-incubator-common-clear",
                                }),
                        });
                    }
                    var p = i(65),
                        u = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let f = class extends p.ComponentModelBase {
                        map;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-line-of-sight-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                            };
                        }
                    };
                    u(
                        [(0, p.importModel)("map-extension")],
                        f.prototype,
                        "map",
                        void 0
                    ),
                        (f = u([p.serializable], f));
                    const h = f;
                },
                939: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            ShadowCastModel: () => f,
                            applySettings: () => m,
                            default: () => g,
                            getSettings: () => y,
                            getSettingsSchema: () => w,
                        });
                    var o = i(308),
                        n = i(995),
                        a = i.n(n),
                        l = i(817),
                        s = i(959);
                    const r = (0, i(956).createEsriMapWidget)(a(), !0, !0),
                        d = (0, l.styled)(r)(
                            ({ theme: { typography: e } }) => ({
                                "--calcite-ui-text-1":
                                    "var(--primaryForeground)",
                                "--calcite-font-size--2": e.fontSize,
                                "& .esri-widget": { width: "100%" },
                                "& .calcite-select": {
                                    "--calcite-select-font-size": e.fontSize,
                                },
                            })
                        );
                    function g(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [n, a] = (0, s.useState)();
                        return (
                            (0, l.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, l.useWatchAndRerender)(t, [
                                "title",
                                "timeRangeSlider",
                                "timezone",
                                "datePicker",
                                "visualizationOptions",
                                "colorPicker",
                                "tooltip",
                                "visualizationType",
                            ]),
                            (0, s.useEffect)(() => {
                                n &&
                                    ((n.visibleElements = {
                                        timeRangeSlider: t.timeRangeSlider,
                                        timezone: t.timezone,
                                        datePicker: t.datePicker,
                                        visualizationOptions:
                                            t.visualizationOptions,
                                        colorPicker: t.colorPicker,
                                        tooltip: t.tooltip,
                                    }),
                                    (n.label = t.title),
                                    n.viewModel &&
                                        (n.viewModel.visualizationType =
                                            t.visualizationType));
                            }, [
                                n,
                                n?.viewModel,
                                t,
                                t.title,
                                t.timeRangeSlider,
                                t.timezone,
                                t.datePicker,
                                t.visualizationOptions,
                                t.colorPicker,
                                t.tooltip,
                                t.visualizationType,
                            ]),
                            "map" === i.viewMode
                                ? null
                                : (0, o.jsx)(d, { onWidgetCreated: a, ...e })
                        );
                    }
                    var c = i(65),
                        p = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let u = class extends c.ComponentModelBase {
                        map;
                        timeRangeSlider;
                        timezone;
                        datePicker;
                        visualizationOptions;
                        colorPicker;
                        tooltip;
                        visualizationType;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                timeRangeSlider: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                timezone: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                datePicker: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                visualizationOptions: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                colorPicker: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                visualizationType: {
                                    serializeModes: ["initial"],
                                    default: "threshold",
                                },
                                tooltip: {
                                    serializeModes: ["initial"],
                                    default: !0,
                                },
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-shadow-cast-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                            };
                        }
                    };
                    p(
                        [(0, c.importModel)("map-extension")],
                        u.prototype,
                        "map",
                        void 0
                    ),
                        (u = p([c.serializable], u));
                    const f = u;
                    var h = i(622);
                    const m = async (e) => {
                            const { model: t, settings: i } = e;
                            await (0, h.applyComponentModelDesignerSettings)(e),
                                t.assignProperties(i);
                        },
                        y = async (e) => {
                            const { model: t } = e,
                                {
                                    timeRangeSlider: i,
                                    timezone: o,
                                    datePicker: n,
                                    visualizationOptions: a,
                                    colorPicker: l,
                                    tooltip: s,
                                    visualizationType: r,
                                } = t;
                            return {
                                ...(await (0,
                                h.getComponentModelDesignerSettings)(e)),
                                timeRangeSlider: i,
                                timezone: o,
                                datePicker: n,
                                visualizationOptions: a,
                                colorPicker: l,
                                tooltip: s,
                                visualizationType: r,
                            };
                        },
                        w = async (e) => {
                            const t = await (0,
                            h.getComponentModelDesignerSettingsSchema)(e);
                            return (
                                (t.settings[0].settings =
                                    t.settings[0].settings.concat([
                                        {
                                            id: "timeRangeSlider",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-time-range-slider-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-time-range-slider-title",
                                        },
                                        {
                                            id: "timezone",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-timezone-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-timezone-title",
                                        },
                                        {
                                            id: "datePicker",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-date-picker-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-date-picker-title",
                                        },
                                        {
                                            id: "visualizationOptions",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-visualization-options-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-visualization-options-title",
                                        },
                                        {
                                            id: "colorPicker",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-color-picker-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-color-picker-title",
                                        },
                                        {
                                            id: "tooltip",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-tooltip-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-tooltip-title",
                                        },
                                        {
                                            id: "visualizationType",
                                            type: "select",
                                            description:
                                                "language-designer-3d-tools-shadow-cast-visualization-type-description",
                                            displayName:
                                                "language-designer-3d-tools-shadow-cast-visualization-type-title",
                                            values: [
                                                {
                                                    displayName:
                                                        "language-designer-3d-tools-shadow-cast-visualization-type-threshold",
                                                    value: "threshold",
                                                },
                                                {
                                                    displayName:
                                                        "language-designer-3d-tools-shadow-cast-visualization-type-duration",
                                                    value: "duration",
                                                },
                                                {
                                                    displayName:
                                                        "language-designer-3d-tools-shadow-cast-visualization-type-discrete",
                                                    value: "discrete",
                                                },
                                            ],
                                        },
                                    ])),
                                { ...t, settings: [...t.settings] }
                            );
                        };
                },
                321: (e, t, i) => {
                    i.r(t),
                        i.d(t, {
                            SliceModel: () => h,
                            applySettings: () => y,
                            default: () => c,
                            getSettings: () => w,
                            getSettingsSchema: () => b,
                        });
                    var o = i(308),
                        n = i(959),
                        a = i(146),
                        l = i.n(a),
                        s = i(817),
                        r = i(710),
                        d = i.n(r);
                    const g = (0, i(956).createEsriMapWidget)(l(), !0, !0);
                    function c(e) {
                        const { model: t } = e,
                            { map: i } = t,
                            [a, l] = (0, n.useState)();
                        if (
                            ((0, s.useWatchAndRerender)(i, [
                                "map",
                                "isSwitchingViewMode",
                            ]),
                            (0, s.useWatchAndRerender)(t, [
                                "title",
                                "tiltEnabled",
                            ]),
                            (0, s.useWatchAndRerender)(a?.viewModel, "state"),
                            (0, n.useEffect)(() => {
                                a &&
                                    ((a.label = t.title),
                                    a.viewModel &&
                                        (a.viewModel.tiltEnabled =
                                            t.tiltEnabled));
                            }, [i, t.tiltEnabled, t.title, a, a?.viewModel]),
                            (0, n.useEffect)(() => {
                                if (!a?.container) return;
                                const e = new MutationObserver((e) => {
                                    e.forEach((e) => {
                                        [...e.addedNodes.values()].find((e) =>
                                            (e.className ?? "").includes(
                                                "esri-slice__cancel-button"
                                            )
                                        ) && (i._suppressMapClick = !0),
                                            [...e.removedNodes.values()].find(
                                                (e) =>
                                                    (
                                                        e.className ?? ""
                                                    ).includes(
                                                        "esri-slice__cancel-button"
                                                    )
                                            ) && (i._suppressMapClick = !1);
                                    });
                                });
                                return (
                                    e.observe(a.container, {
                                        subtree: !0,
                                        childList: !0,
                                    }),
                                    () => {
                                        e.disconnect(),
                                            (i._suppressMapClick = !1);
                                    }
                                );
                            }, [a, i]),
                            "map" === i.viewMode)
                        )
                            return null;
                        const r =
                            "sliced" === a?.viewModel?.state ||
                            "slicing" === a?.viewModel?.state;
                        return (0, o.jsx)(g, {
                            onWidgetCreated: l,
                            ...e,
                            sx: { pb: 2 },
                            children:
                                r &&
                                (0, o.jsx)(d(), {
                                    sx: { m: 2, cursor: "pointer" },
                                    onClick: () => a.viewModel.clear(),
                                    children:
                                        "language-web-incubator-common-clear",
                                }),
                        });
                    }
                    var p = i(65),
                        u = function (e, t, i, o) {
                            var n,
                                a = arguments.length,
                                l =
                                    a < 3
                                        ? t
                                        : null === o
                                        ? (o = Object.getOwnPropertyDescriptor(
                                              t,
                                              i
                                          ))
                                        : o;
                            if (
                                "object" == typeof Reflect &&
                                "function" == typeof Reflect.decorate
                            )
                                l = Reflect.decorate(e, t, i, o);
                            else
                                for (var s = e.length - 1; s >= 0; s--)
                                    (n = e[s]) &&
                                        (l =
                                            (a < 3
                                                ? n(l)
                                                : a > 3
                                                ? n(t, i, l)
                                                : n(t, i)) || l);
                            return (
                                a > 3 && l && Object.defineProperty(t, i, l), l
                            );
                        };
                    let f = class extends p.ComponentModelBase {
                        map;
                        tiltEnabled;
                        _getSerializableProperties() {
                            const e = super._getSerializableProperties();
                            return {
                                ...e,
                                title: {
                                    ...this._toPropertyDef(e.title),
                                    default:
                                        "language-web-incubator-slice-3d-title",
                                },
                                icon: {
                                    ...this._toPropertyDef(e.icon),
                                    default: "map-3rd-party",
                                },
                                tiltEnabled: {
                                    ...this._toPropertyDef(e.tiltEnabled),
                                    default: !0,
                                },
                            };
                        }
                    };
                    u(
                        [(0, p.importModel)("map-extension")],
                        f.prototype,
                        "map",
                        void 0
                    ),
                        (f = u([p.serializable], f));
                    const h = f;
                    var m = i(622);
                    const y = async (e) => {
                            const { model: t, settings: i } = e;
                            await (0, m.applyComponentModelDesignerSettings)(e),
                                t.assignProperties(i);
                        },
                        w = async (e) => {
                            const { model: t } = e,
                                { tiltEnabled: i } = t;
                            return {
                                ...(await (0,
                                m.getComponentModelDesignerSettings)(e)),
                                tiltEnabled: i,
                            };
                        },
                        b = async (e) => {
                            const t = await (0,
                            m.getComponentModelDesignerSettingsSchema)(e);
                            return (
                                (t.settings[0].settings =
                                    t.settings[0].settings.concat([
                                        {
                                            id: "tiltEnabled",
                                            type: "checkbox",
                                            description:
                                                "language-designer-3d-tools-slice-tilt-enabled-description",
                                            displayName:
                                                "language-designer-3d-tools-slice-tilt-enabled-title",
                                        },
                                    ])),
                                { ...t, settings: [...t.settings] }
                            );
                        };
                },
                336: (e) => {
                    e.exports = m;
                },
                326: (e) => {
                    e.exports = h;
                },
                130: (e) => {
                    e.exports = n;
                },
                299: (e) => {
                    e.exports = c;
                },
                520: (e) => {
                    e.exports = p;
                },
                621: (e) => {
                    e.exports = u;
                },
                390: (e) => {
                    e.exports = f;
                },
                64: (e) => {
                    e.exports = r;
                },
                995: (e) => {
                    e.exports = s;
                },
                146: (e) => {
                    e.exports = l;
                },
                568: (e) => {
                    e.exports = y;
                },
                622: (e) => {
                    e.exports = g;
                },
                65: (e) => {
                    e.exports = d;
                },
                817: (e) => {
                    e.exports = a;
                },
                710: (e) => {
                    e.exports = o;
                },
                956: (e) => {
                    e.exports = i;
                },
                959: (e) => {
                    e.exports = t;
                },
                308: (t) => {
                    t.exports = e;
                },
            },
            b = {};
        function v(e) {
            var t = b[e];
            if (void 0 !== t) return t.exports;
            var i = (b[e] = { exports: {} });
            return w[e](i, i.exports, v), i.exports;
        }
        (v.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return v.d(t, { a: t }), t;
        }),
            (v.d = (e, t) => {
                for (var i in t)
                    v.o(t, i) &&
                        !v.o(e, i) &&
                        Object.defineProperty(e, i, {
                            enumerable: !0,
                            get: t[i],
                        });
            }),
            (v.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
            (v.r = (e) => {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(e, "__esModule", { value: !0 });
            });
        var S = {};
        return (
            (() => {
                v.r(S), v.d(S, { default: () => r });
                const e = JSON.parse(
                        '{"language-web-incubator-common-clear":"Clear","language-web-incubator-area-measurement-3d-title":"Area Measurement 3D","language-web-incubator-line-measurement-3d-title":"Direct Line Measurement 3D","language-web-incubator-line-of-sight-3d-title":"Line of Sight","language-web-incubator-daylight-widget-3d-title":"Daylight","language-web-incubator-elevation-profile-3d-title":"Elevation Profile","language-web-incubator-shadow-cast-3d-title":"Shadow Cast","language-web-incubator-slice-3d-title":"Slice","language-web-incubator-area-measurement-3d-description":"The AreaMeasurement3D component calculates and displays the area and perimeter of a polygon.","language-web-incubator-line-measurement-3d-description":"The DirectLineMeasurement3D widget calculates and displays the 3D distance between two points.","language-web-incubator-line-of-sight-3d-description":"The LineOfSight component is a 3D analysis tool that allows you to perform visibility analysis in a SceneView.","language-web-incubator-daylight-widget-3d-description":"The daylight component can be used to manipulate the time and date and to toggle shadows in a SceneView.","language-web-incubator-elevation-profile-3d-description":"The ElevationProfile component is used to generate and display an elevation profile from an input line graphic.","language-web-incubator-shadow-cast-3d-description":"The ShadowCast component displays the cumulative shadows of 3D features in a SceneView.","language-web-incubator-slice-3d-description":"The slice component is a 3D analysis tool that can be used to reveal occluded content in a SceneView.","language-designer-3d-tools-daylight-play-buttons-description":"When disabled, neither of the play buttons are displayed.","language-designer-3d-tools-daylight-play-buttons-title":"Show Widget Play Buttons","language-designer-3d-tools-daylight-shadows-toggle-description":"When disabled, the shadow toggle button is not displayed.","language-designer-3d-tools-daylight-shadows-toggle-title":"Show Widget Shadow Checkbox","language-designer-3d-tools-daylight-date-picker-description":"When disabled, neither the date nor the season picker are displayed.","language-designer-3d-tools-daylight-date-picker-title":"Show Widget Date Picker","language-designer-3d-tools-daylight-timezone-description":"When disabled, the timezone selector is not displayed.","language-designer-3d-tools-daylight-timezone-title":"Show Widget Timezone","language-designer-3d-tools-daylight-date-or-season-description":"Controls whether the widget displays a date or a season picker.","language-designer-3d-tools-daylight-date-or-season-title":"Date or Season","language-designer-3d-tools-daylight-date-or-season-date":"Date","language-designer-3d-tools-daylight-date-or-season-season":"Season","language-designer-3d-tools-daylight-play-speed-multiplier-description":"Controls the speed of the daytime and date animation.","language-designer-3d-tools-daylight-play-speed-multiplier-title":"Play Speed Multiplier","language-designer-3d-tools-shadow-cast-time-range-slider-description":"When disabled, the slider used to select a time range for the analysis is not displayed.","language-designer-3d-tools-shadow-cast-time-range-slider-title":"Show Widget Time Range Slider","language-designer-3d-tools-shadow-cast-timezone-description":"When disabled, the dropdown used to select a timezone for the time range is not displayed.","language-designer-3d-tools-shadow-cast-timezone-title":"Show Widget Time Range Timezone","language-designer-3d-tools-shadow-cast-date-picker-description":"When disabled, the date picker is not displayed.","language-designer-3d-tools-shadow-cast-date-picker-title":"Show Widget Date Picker","language-designer-3d-tools-shadow-cast-visualization-options-description":"When disabled, the options for the various visualization modes are not displayed.","language-designer-3d-tools-shadow-cast-visualization-options-title":"Show Widget Visualization Options","language-designer-3d-tools-shadow-cast-color-picker-description":"When disabled, the color picker is not displayed in the options for any of the visualization modes.","language-designer-3d-tools-shadow-cast-color-picker-title":"Show Widget Color Picker","language-designer-3d-tools-shadow-cast-tooltip-description":"When disabled, the tooltip with the accumulated shadow time is not displayed when hovering the view.","language-designer-3d-tools-shadow-cast-tooltip-title":"Show Tooltip in View","language-designer-3d-tools-shadow-cast-visualization-type-description":"Type of visualization to use when showing the shadows.","language-designer-3d-tools-shadow-cast-visualization-type-title":"Default Shadow Visualization","language-designer-3d-tools-shadow-cast-visualization-type-threshold":"Areas Above Threshold","language-designer-3d-tools-shadow-cast-visualization-type-duration":"Total Shadow Duration","language-designer-3d-tools-shadow-cast-visualization-type-discrete":"Discrete Shadows","language-designer-3d-tools-elevation-profile-legend-description":"When disabled, the legend (which includes statistics) is not displayed.","language-designer-3d-tools-elevation-profile-legend-title":"Show Widget Legend","language-designer-3d-tools-elevation-profile-chart-description":"When disabled, the chart is not displayed.","language-designer-3d-tools-elevation-profile-chart-title":"Show Widget Chart","language-designer-3d-tools-elevation-profile-clear-button-description":"When disabled the button used to clear the current elevation profile is not displayed.","language-designer-3d-tools-elevation-profile-clear-button-title":"Show Widget Clear Button","language-designer-3d-tools-elevation-profile-settings-button-description":"When disabled, the button used to open the settings popup is not displayed.","language-designer-3d-tools-elevation-profile-settings-button-title":"Show Widget Settings Button","language-designer-3d-tools-elevation-profile-sketch-button-description":"When disabled, the button used to start drawing/sketching is not displayed.","language-designer-3d-tools-elevation-profile-sketch-button-title":"Show Widget Sketch Button","language-designer-3d-tools-elevation-profile-select-button-description":"When disabled, the button used to select a path is not displayed.","language-designer-3d-tools-elevation-profile-select-button-title":"Show Widget Select Button","language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-description":"When disabled, the element used to toggle uniform chart scaling on or off is not displayed.","language-designer-3d-tools-elevation-profile-uniform-chart-scaling-toggle-title":"Show Widget Uniform Chart Scaling","language-designer-3d-tools-elevation-profile-profile-line-ground-description":"Profile line which samples elevation from the Ground of the Map currently set in the View.","language-designer-3d-tools-elevation-profile-profile-line-ground-title":"Use Ground Line Profile ","language-designer-3d-tools-elevation-profile-profile-line-input-description":"Profile line which samples elevation from a custom elevation source, for example by creating a new ElevationLayer, or by using an elevation layer from ground.layers.","language-designer-3d-tools-elevation-profile-profile-line-input-title":"Use Line Input Profile","language-designer-3d-tools-elevation-profile-profile-line-view-description":"Profile line which samples elevation directly from the SceneView.","language-designer-3d-tools-elevation-profile-profile-line-view-title":"Use Line View Profile","language-designer-3d-tools-elevation-profile-profile-line-ground-color-title":"Ground Line Profile Color","language-designer-3d-tools-elevation-profile-profile-line-ground-color-description":"Color of the line on the chart and in the view.","language-designer-3d-tools-elevation-profile-profile-line-input-color-title":"Line Input Profile Color","language-designer-3d-tools-elevation-profile-profile-line-input-color-description":"Color of the line on the chart and in the view.","language-designer-3d-tools-elevation-profile-profile-line-view-color-title":"Line View Profile Color","language-designer-3d-tools-elevation-profile-profile-line-view-color-description":"Color of the line on the chart and in the view.","language-designer-3d-tools-slice-tilt-enabled-description":"Enable tilting the slice shape.","language-designer-3d-tools-slice-tilt-enabled-title":"Enable Widget Tilting"}'
                    ),
                    t = () => Promise.resolve().then(v.bind(v, 227)),
                    i = () => Promise.resolve().then(v.bind(v, 815)),
                    o = () => Promise.resolve().then(v.bind(v, 942)),
                    n = () => Promise.resolve().then(v.bind(v, 680)),
                    a = () => Promise.resolve().then(v.bind(v, 843)),
                    l = () => Promise.resolve().then(v.bind(v, 321)),
                    s = () => Promise.resolve().then(v.bind(v, 939));
                function r(r) {
                    r.registerModel({
                        getModel: async (e) =>
                            new (await t()).AreaMeasurementModel(e),
                        itemType: "area-measurement-3d",
                    }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await i()).LineMeasurementModel(e),
                            itemType: "line-measurement-3d",
                        }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await a()).LineOfSightModel(e),
                            itemType: "line-of-sight-3d",
                        }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await o()).DaylightModel(e),
                            itemType: "daylight-widget-3d",
                        }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await n()).ElevationProfileModel(e),
                            itemType: "elevation-profile-3d",
                        }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await s()).ShadowCastModel(e),
                            itemType: "shadow-cast-3d",
                        }),
                        r.registerModel({
                            getModel: async (e) =>
                                new (await l()).SliceModel(e),
                            itemType: "slice-3d",
                        }),
                        r.registerComponent({
                            name: "area-measurement-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await t()).default,
                            category: "map",
                            itemType: "area-measurement-3d",
                            title: "language-web-incubator-area-measurement-3d-title",
                            description:
                                "language-web-incubator-area-measurement-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "line-of-sight-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await a()).default,
                            category: "map",
                            itemType: "line-of-sight-3d",
                            title: "language-web-incubator-line-of-sight-3d-title",
                            description:
                                "language-web-incubator-line-of-sight-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "line-measurement-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await i()).default,
                            category: "map",
                            itemType: "line-measurement-3d",
                            title: "language-web-incubator-line-measurement-3d-title",
                            description:
                                "language-web-incubator-line-measurement-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "daylight-widget-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await o()).default,
                            getDesignerSettings: async (e) =>
                                (await o()).getSettings(e),
                            applyDesignerSettings: async (e) =>
                                (await o()).applySettings(e),
                            getDesignerSettingsSchema: async (e) =>
                                (await o()).getSettingsSchema(e),
                            category: "map",
                            itemType: "daylight-widget-3d",
                            title: "language-web-incubator-daylight-widget-3d-title",
                            description:
                                "language-web-incubator-daylight-widget-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "elevation-profile-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await n()).default,
                            getDesignerSettings: async (e) =>
                                (await n()).getSettings(e),
                            applyDesignerSettings: async (e) =>
                                (await n()).applySettings(e),
                            getDesignerSettingsSchema: async (e) =>
                                (await n()).getSettingsSchema(e),
                            category: "map",
                            itemType: "elevation-profile-3d",
                            title: "language-web-incubator-elevation-profile-3d-title",
                            description:
                                "language-web-incubator-elevation-profile-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "shadow-cast-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await s()).default,
                            getDesignerSettings: async (e) =>
                                (await s()).getSettings(e),
                            applyDesignerSettings: async (e) =>
                                (await s()).applySettings(e),
                            getDesignerSettingsSchema: async (e) =>
                                (await s()).getSettingsSchema(e),
                            category: "map",
                            itemType: "shadow-cast-3d",
                            title: "language-web-incubator-shadow-cast-3d-title",
                            description:
                                "language-web-incubator-shadow-cast-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerComponent({
                            name: "slice-3d",
                            namespace: "vertigis.web.incubator",
                            getComponentType: async () => (await l()).default,
                            getDesignerSettings: async (e) =>
                                (await l()).getSettings(e),
                            applyDesignerSettings: async (e) =>
                                (await l()).applySettings(e),
                            getDesignerSettingsSchema: async (e) =>
                                (await l()).getSettingsSchema(e),
                            category: "map",
                            itemType: "slice-3d",
                            title: "language-web-incubator-slice-3d-title",
                            description:
                                "language-web-incubator-slice-3d-description",
                            iconId: "map-3rd-party",
                        }),
                        r.registerLanguageResources({
                            locale: "inv",
                            values: e,
                        }),
                        r.registerLanguageResources({
                            locale: "en",
                            values: e,
                        });
                }
            })(),
            S
        );
    })());
