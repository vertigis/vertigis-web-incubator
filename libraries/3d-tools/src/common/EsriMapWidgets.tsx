import type Accessor from "@arcgis/core/core/Accessor";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import type MapView from "@arcgis/core/views/MapView";
import type SceneView from "@arcgis/core/views/SceneView";
import type Widget from "@arcgis/core/widgets/Widget";

import { Component, ComponentType, createRef, ReactNode } from "react";

import type { MapModel } from "@vertigis/web/mapping";
import {
    LayoutElement,
    LayoutElementProperties,
} from "@vertigis/web/components";
import { ComponentModelBase } from "@vertigis/web/models";

export type MapOrSceneView = MapView | SceneView;
export interface MapWidget extends __esri.Widget {
    view: MapOrSceneView;
}
export type MapWidgetConstructor = new (
    props: __esri.WidgetProperties & {
        view: MapOrSceneView;
        container: HTMLElement;
    }
) => MapWidget;
export type ModelWithMap = ComponentModelBase & { map: MapModel };
export interface MapWidgetProps<
    M extends ModelWithMap,
    T extends Widget = Widget
> extends LayoutElementProperties<M> {
    onWidgetCreated?: (widget: T) => void;
    onWidgetDestroyed?: () => void;
}

export interface MapWidgetContainerProperties {
    tabIndex?: number;
}

/**
 * Creates a React component that wraps an Esri map widget. It requires a model
 * that imports a MapModel.
 */
export function createEsriMapWidget<
    M extends ModelWithMap & Accessor,
    T extends MapWidget = MapWidget
>(
    widgetType: MapWidgetConstructor,
    containerProperties?: MapWidgetContainerProperties,
    stretch?: boolean
): ComponentType<MapWidgetProps<M, T>> {
    return class extends Component<MapWidgetProps<M, T>> {
        displayName: "createEsriMapWidget";
        private _widget: T;
        private _handle: IHandle;
        private readonly _rootRef = createRef<HTMLDivElement>();

        render(): ReactNode {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { onWidgetCreated, onWidgetDestroyed, ...other } = this.props;
            return (
                <LayoutElement stretch={stretch} {...other}>
                    <div ref={this._rootRef} />
                </LayoutElement>
            );
        }

        componentDidMount(): void {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            watchUtils.whenOnce(this.props.model, "map.view", () => {
                if (!this._rootRef.current) {
                    return;
                }
                this._createWidget();
                this._handle = this.props.model.watch("map.view", (view) => {
                    this._destroyWidget();
                    if (view) {
                        this._createWidget();
                    }
                });
            });
        }

        componentWillUnmount(): void {
            this._destroyWidget();
            if (this._handle) {
                this._handle.remove();
            }
        }

        private _createWidget(): void {
            // If we give Esri's widget a DOM element managed by React, it will
            // delete the element once destroyed, causing React to freak out.
            // Instead, create one manually.
            const container = document.createElement("div");
            if (containerProperties) {
                if (containerProperties.tabIndex !== undefined) {
                    container.tabIndex = containerProperties.tabIndex;
                }
            }
            this._rootRef.current.appendChild(container);

            this._widget = new widgetType({
                view: this.props.model.map.view,
                container,
            }) as T;

            if (this.props.onWidgetCreated) {
                this.props.onWidgetCreated(this._widget);
            }
        }

        private _destroyWidget(): void {
            if (!this._widget) {
                return;
            }

            this._widget.destroy();
            this._widget = undefined;
            if (this.props.onWidgetDestroyed) {
                this.props.onWidgetDestroyed();
            }
        }
    };
}
