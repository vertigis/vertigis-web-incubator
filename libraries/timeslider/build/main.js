define([
    "react",
    "@arcgis/core/widgets/TimeSlider",
    "@vertigis/web/ui/esriUtils",
    "@vertigis/web/ui",
    "@vertigis/web/models",
    "@vertigis/arcgis-extensions/ItemType",
    "@arcgis/core/TimeExtent",
    "@vertigis/web/designer",
], (e, t, i, n, r, o, s, a) =>
    (() => {
        "use strict";
        var l = {
                897: (e, t, i) => {
                    i.d(t, { A: () => a });
                    var n = i(758),
                        r = i.n(n),
                        o = i(935),
                        s = i.n(o)()(r());
                    s.push([
                        e.id,
                        "/* Adjust Esri styling for the Time Slider component wrapper */\n.esri-time-slider__layout--wide {\n    min-width: 858px;\n}\n",
                        "",
                    ]);
                    const a = s;
                },
                935: (e) => {
                    e.exports = function (e) {
                        var t = [];
                        return (
                            (t.toString = function () {
                                return this.map(function (t) {
                                    var i = "",
                                        n = void 0 !== t[5];
                                    return (
                                        t[4] &&
                                            (i += "@supports (".concat(
                                                t[4],
                                                ") {"
                                            )),
                                        t[2] &&
                                            (i += "@media ".concat(t[2], " {")),
                                        n &&
                                            (i += "@layer".concat(
                                                t[5].length > 0
                                                    ? " ".concat(t[5])
                                                    : "",
                                                " {"
                                            )),
                                        (i += e(t)),
                                        n && (i += "}"),
                                        t[2] && (i += "}"),
                                        t[4] && (i += "}"),
                                        i
                                    );
                                }).join("");
                            }),
                            (t.i = function (e, i, n, r, o) {
                                "string" == typeof e &&
                                    (e = [[null, e, void 0]]);
                                var s = {};
                                if (n)
                                    for (var a = 0; a < this.length; a++) {
                                        var l = this[a][0];
                                        null != l && (s[l] = !0);
                                    }
                                for (var d = 0; d < e.length; d++) {
                                    var u = [].concat(e[d]);
                                    (n && s[u[0]]) ||
                                        (void 0 !== o &&
                                            (void 0 === u[5] ||
                                                (u[1] = "@layer"
                                                    .concat(
                                                        u[5].length > 0
                                                            ? " ".concat(u[5])
                                                            : "",
                                                        " {"
                                                    )
                                                    .concat(u[1], "}")),
                                            (u[5] = o)),
                                        i &&
                                            (u[2]
                                                ? ((u[1] = "@media "
                                                      .concat(u[2], " {")
                                                      .concat(u[1], "}")),
                                                  (u[2] = i))
                                                : (u[2] = i)),
                                        r &&
                                            (u[4]
                                                ? ((u[1] = "@supports ("
                                                      .concat(u[4], ") {")
                                                      .concat(u[1], "}")),
                                                  (u[4] = r))
                                                : (u[4] = "".concat(r))),
                                        t.push(u));
                                }
                            }),
                            t
                        );
                    };
                },
                758: (e) => {
                    e.exports = function (e) {
                        return e[1];
                    };
                },
                591: (e) => {
                    var t = [];
                    function i(e) {
                        for (var i = -1, n = 0; n < t.length; n++)
                            if (t[n].identifier === e) {
                                i = n;
                                break;
                            }
                        return i;
                    }
                    function n(e, n) {
                        for (var o = {}, s = [], a = 0; a < e.length; a++) {
                            var l = e[a],
                                d = n.base ? l[0] + n.base : l[0],
                                u = o[d] || 0,
                                p = "".concat(d, " ").concat(u);
                            o[d] = u + 1;
                            var c = i(p),
                                m = {
                                    css: l[1],
                                    media: l[2],
                                    sourceMap: l[3],
                                    supports: l[4],
                                    layer: l[5],
                                };
                            if (-1 !== c) t[c].references++, t[c].updater(m);
                            else {
                                var f = r(m, n);
                                (n.byIndex = a),
                                    t.splice(a, 0, {
                                        identifier: p,
                                        updater: f,
                                        references: 1,
                                    });
                            }
                            s.push(p);
                        }
                        return s;
                    }
                    function r(e, t) {
                        var i = t.domAPI(t);
                        return (
                            i.update(e),
                            function (t) {
                                if (t) {
                                    if (
                                        t.css === e.css &&
                                        t.media === e.media &&
                                        t.sourceMap === e.sourceMap &&
                                        t.supports === e.supports &&
                                        t.layer === e.layer
                                    )
                                        return;
                                    i.update((e = t));
                                } else i.remove();
                            }
                        );
                    }
                    e.exports = function (e, r) {
                        var o = n((e = e || []), (r = r || {}));
                        return function (e) {
                            e = e || [];
                            for (var s = 0; s < o.length; s++) {
                                var a = i(o[s]);
                                t[a].references--;
                            }
                            for (var l = n(e, r), d = 0; d < o.length; d++) {
                                var u = i(o[d]);
                                0 === t[u].references &&
                                    (t[u].updater(), t.splice(u, 1));
                            }
                            o = l;
                        };
                    };
                },
                128: (e) => {
                    var t = {};
                    e.exports = function (e, i) {
                        var n = (function (e) {
                            if (void 0 === t[e]) {
                                var i = document.querySelector(e);
                                if (
                                    window.HTMLIFrameElement &&
                                    i instanceof window.HTMLIFrameElement
                                )
                                    try {
                                        i = i.contentDocument.head;
                                    } catch (e) {
                                        i = null;
                                    }
                                t[e] = i;
                            }
                            return t[e];
                        })(e);
                        if (!n)
                            throw new Error(
                                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
                            );
                        n.appendChild(i);
                    };
                },
                51: (e) => {
                    e.exports = function (e) {
                        var t = document.createElement("style");
                        return (
                            e.setAttributes(t, e.attributes),
                            e.insert(t, e.options),
                            t
                        );
                    };
                },
                855: (e, t, i) => {
                    e.exports = function (e) {
                        var t = i.nc;
                        t && e.setAttribute("nonce", t);
                    };
                },
                740: (e) => {
                    e.exports = function (e) {
                        if ("undefined" == typeof document)
                            return {
                                update: function () {},
                                remove: function () {},
                            };
                        var t = e.insertStyleElement(e);
                        return {
                            update: function (i) {
                                !(function (e, t, i) {
                                    var n = "";
                                    i.supports &&
                                        (n += "@supports (".concat(
                                            i.supports,
                                            ") {"
                                        )),
                                        i.media &&
                                            (n += "@media ".concat(
                                                i.media,
                                                " {"
                                            ));
                                    var r = void 0 !== i.layer;
                                    r &&
                                        (n += "@layer".concat(
                                            i.layer.length > 0
                                                ? " ".concat(i.layer)
                                                : "",
                                            " {"
                                        )),
                                        (n += i.css),
                                        r && (n += "}"),
                                        i.media && (n += "}"),
                                        i.supports && (n += "}");
                                    var o = i.sourceMap;
                                    o &&
                                        "undefined" != typeof btoa &&
                                        (n +=
                                            "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                                                btoa(
                                                    unescape(
                                                        encodeURIComponent(
                                                            JSON.stringify(o)
                                                        )
                                                    )
                                                ),
                                                " */"
                                            )),
                                        t.styleTagTransform(n, e, t.options);
                                })(t, e, i);
                            },
                            remove: function () {
                                !(function (e) {
                                    if (null === e.parentNode) return !1;
                                    e.parentNode.removeChild(e);
                                })(t);
                            },
                        };
                    };
                },
                656: (e) => {
                    e.exports = function (e, t) {
                        if (t.styleSheet) t.styleSheet.cssText = e;
                        else {
                            for (; t.firstChild; ) t.removeChild(t.firstChild);
                            t.appendChild(document.createTextNode(e));
                        }
                    };
                },
                995: (e) => {
                    e.exports = s;
                },
                280: (e) => {
                    e.exports = t;
                },
                348: (e) => {
                    e.exports = o;
                },
                622: (e) => {
                    e.exports = a;
                },
                65: (e) => {
                    e.exports = r;
                },
                817: (e) => {
                    e.exports = n;
                },
                956: (e) => {
                    e.exports = i;
                },
                959: (t) => {
                    t.exports = e;
                },
            },
            d = {};
        function u(e) {
            var t = d[e];
            if (void 0 !== t) return t.exports;
            var i = (d[e] = { id: e, exports: {} });
            return l[e](i, i.exports, u), i.exports;
        }
        (u.n = (e) => {
            var t = e && e.__esModule ? () => e.default : () => e;
            return u.d(t, { a: t }), t;
        }),
            (u.d = (e, t) => {
                for (var i in t)
                    u.o(t, i) &&
                        !u.o(e, i) &&
                        Object.defineProperty(e, i, {
                            enumerable: !0,
                            get: t[i],
                        });
            }),
            (u.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
            (u.r = (e) => {
                "undefined" != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module",
                    }),
                    Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (u.nc = void 0);
        var p = {};
        return (
            (() => {
                u.r(p), u.d(p, { default: () => j });
                var e = u(959),
                    t = u.n(e),
                    i = u(280),
                    n = u.n(i),
                    r = u(956),
                    o = u(591),
                    s = u.n(o),
                    a = u(740),
                    l = u.n(a),
                    d = u(128),
                    c = u.n(d),
                    m = u(855),
                    f = u.n(m),
                    g = u(51),
                    h = u.n(g),
                    y = u(656),
                    v = u.n(y),
                    w = u(897),
                    b = {};
                (b.styleTagTransform = v()),
                    (b.setAttributes = f()),
                    (b.insert = c().bind(null, "head")),
                    (b.domAPI = l()),
                    (b.insertStyleElement = h()),
                    s()(w.A, b),
                    w.A && w.A.locals && w.A.locals;
                var x = u(817);
                const T = (0, r.createEsriMapWidget)(n(), void 0, !0),
                    S = (i) => {
                        const { model: n, ...r } = i;
                        (0, x.useWatchAndRerender)(n, ["map.map"]),
                            (0, x.useWatch)(
                                n,
                                "map.map",
                                (e) => {
                                    n.widget &&
                                        (n.widget.stop(),
                                        n.updateTimeSliderWidget(n.widget, e));
                                },
                                [n.map.view]
                            );
                        const o = (0, e.useCallback)(
                                (e) => {
                                    const t = n.map;
                                    if (!t?.map) return;
                                    const i = t.map;
                                    n.updateTimeSliderWidget(e, i);
                                },
                                [n]
                            ),
                            s = (0, e.useCallback)(() => {
                                (n.map.view.timeExtent = null),
                                    (n.widget = null);
                            }, [n]);
                        return t().createElement(T, {
                            model: i.model,
                            onWidgetCreated: o,
                            onWidgetDestroyed: s,
                            stretch: !0,
                            ...r,
                        });
                    };
                var E = u(65),
                    _ = u(348),
                    I = u(995),
                    M = u.n(I),
                    R = function (e, t, i, n) {
                        var r,
                            o = arguments.length,
                            s =
                                o < 3
                                    ? t
                                    : null === n
                                    ? (n = Object.getOwnPropertyDescriptor(
                                          t,
                                          i
                                      ))
                                    : n;
                        if (
                            "object" == typeof Reflect &&
                            "function" == typeof Reflect.decorate
                        )
                            s = Reflect.decorate(e, t, i, n);
                        else
                            for (var a = e.length - 1; a >= 0; a--)
                                (r = e[a]) &&
                                    (s =
                                        (o < 3
                                            ? r(s)
                                            : o > 3
                                            ? r(t, i, s)
                                            : r(t, i)) || s);
                        return o > 3 && s && Object.defineProperty(t, i, s), s;
                    };
                let C = class extends E.ComponentModelBase {
                    map;
                    widget;
                    _layout;
                    _loop;
                    _playRate;
                    _mode;
                    _timeVisible;
                    get layout() {
                        return this.widget?.layout ?? this._layout;
                    }
                    set layout(e) {
                        (this._layout = e),
                            this.widget && (this.widget.layout = e);
                    }
                    get loop() {
                        return this.widget?.loop ?? this._loop;
                    }
                    set loop(e) {
                        (this._loop = e), this.widget && (this.widget.loop = e);
                    }
                    get playRate() {
                        return this.widget?.playRate ?? this._playRate;
                    }
                    set playRate(e) {
                        (this._playRate = e),
                            this.widget && (this.widget.playRate = e);
                    }
                    get mode() {
                        return this.widget?.mode ?? this._mode;
                    }
                    set mode(e) {
                        (this._mode = e), this.widget && (this.widget.mode = e);
                    }
                    get timeVisible() {
                        return this.widget?.timeVisible ?? this._timeVisible;
                    }
                    set timeVisible(e) {
                        (this._timeVisible = e),
                            this.widget && (this.widget.timeVisible = e);
                    }
                    updateTimeSliderWidget = async (e, t) => {
                        if (
                            ((this.layout = "auto"),
                            (this.loop = !0),
                            (this.playRate = 1e3),
                            (this.mode = "time-window"),
                            (this.timeVisible = !1),
                            t?.widgets?.timeSlider)
                        ) {
                            const i = t.widgets.timeSlider;
                            await this._updateWidgetFromWebMapTimeSlider(
                                e,
                                i,
                                t
                            );
                        } else await this._updateWidgetFromLayerTimeInfos(e, t);
                        (e.layout = this.layout),
                            (e.loop = this.loop),
                            (e.playRate = this.playRate),
                            (e.mode = this.mode),
                            (e.timeVisible = this.timeVisible),
                            (this.widget = e);
                    };
                    _updateWidgetFromLayerTimeInfos = async (e, t) => {
                        let i, n, r;
                        for (const e of t.allLayers.toArray()) {
                            const t = e;
                            await t.load(),
                                t?.timeInfo?.fullTimeExtent &&
                                    ((void 0 === i ||
                                        i > t.timeInfo.fullTimeExtent.start) &&
                                        (i = t.timeInfo.fullTimeExtent.start),
                                    (void 0 === n ||
                                        n < t.timeInfo.fullTimeExtent.end) &&
                                        (n = t.timeInfo.fullTimeExtent.end),
                                    t.timeInfo &&
                                        (r || (r = t.timeInfo.useTime)));
                        }
                        (e.fullTimeExtent = new (M())({ start: i, end: n })),
                            e.fullTimeExtent &&
                                e.effectiveStops?.[
                                    e.effectiveStops.length - 1
                                ] < e.fullTimeExtent.end &&
                                e.effectiveStops.push(e.fullTimeExtent.end),
                            (this.timeVisible = r);
                    };
                    _updateWidgetFromWebMapTimeSlider = async (e, t, i) => {
                        let n;
                        t.fullTimeExtent
                            ? ((e.fullTimeExtent = t.fullTimeExtent),
                              e.set("timeExtent", t.currentTimeExtent))
                            : ((e.fullTimeExtent = t.currentTimeExtent),
                              (n = "currentTimeExtent")),
                            await this._updateWidgetFromLayerTimeInfos(e, i),
                            t.stops
                                ? (e.stops = {
                                      dates: t.stops,
                                      timeExtent: e.fullTimeExtent,
                                  })
                                : t.numStops
                                ? (e.stops = {
                                      count: t.numStops,
                                      timeExtent: e.fullTimeExtent,
                                  })
                                : t.stopInterval &&
                                  (e.stops = {
                                      interval: t.stopInterval,
                                      timeExtent: e.fullTimeExtent,
                                  }),
                            e.fullTimeExtent &&
                                e.effectiveStops?.[
                                    e.effectiveStops.length - 1
                                ] < e.fullTimeExtent.end &&
                                e.effectiveStops.push(e.fullTimeExtent.end),
                            "currentTimeExtent" === n &&
                                e.set(
                                    "timeExtent",
                                    new (M())({
                                        start: e.effectiveStops[0],
                                        end: e.effectiveStops[1],
                                    })
                                ),
                            t.loop && (this.loop = e.loop),
                            t.stopDelay && (this.playRate = e.playRate),
                            1 === t.numThumbs
                                ? (this.mode = "instant")
                                : (this.mode = "time-window");
                    };
                    _getSerializableProperties() {
                        const e = super._getSerializableProperties();
                        return {
                            ...e,
                            title: {
                                ...this._toPropertyDef(e.title),
                                default:
                                    "language-web-incubator-time-slider-title",
                            },
                            icon: {
                                ...this._toPropertyDef(e.icon),
                                default: "range-start",
                            },
                        };
                    }
                };
                R(
                    [(0, E.importModel)(_.ItemType.MAP_EXTENSION)],
                    C.prototype,
                    "map",
                    void 0
                ),
                    (C = R([E.serializable], C));
                const W = C;
                var A = u(622);
                const P = async (e) => {
                        const { model: t, settings: i } = e;
                        await (0, A.applyComponentModelDesignerSettings)(e),
                            t.assignProperties(i);
                    },
                    D = async (e) => ({
                        ...(await (0, A.getComponentModelDesignerSettings)(e)),
                    }),
                    O = async (e) => {
                        const t = await (0,
                        A.getComponentModelDesignerSettingsSchema)(e);
                        return { ...t, settings: [...t.settings] };
                    },
                    V = JSON.parse(
                        '{"language-web-incubator-time-slider-title":"Time Slider"}'
                    );
                function j(e) {
                    e.registerComponent({
                        name: "time-slider",
                        namespace: "vertigis.web.incubator.time-slider",
                        getComponentType: () => S,
                        getDesignerSettings: (e) => D(e),
                        applyDesignerSettings: (e) => P(e),
                        getDesignerSettingsSchema: (e) => O(e),
                        itemType: "time-slider",
                        title: "language-web-incubator-time-slider-title",
                        iconId: "range-start",
                    }),
                        e.registerModel({
                            getModel: (e) => new W(e),
                            itemType: "time-slider",
                        }),
                        e.registerLanguageResources({
                            locale: "inv",
                            values: V,
                        }),
                        e.registerLanguageResources({
                            locale: "en",
                            values: V,
                        });
                }
            })(),
            p
        );
    })());
