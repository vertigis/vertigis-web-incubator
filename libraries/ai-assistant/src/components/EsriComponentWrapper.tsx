import type { MapOrSceneView } from "@vertigis/web/support/esri";
import { usePrevious } from "@vertigis/web/ui";
import Box, { type BoxProps } from "@vertigis/web/ui/Box";
import type { FC, ReactNode } from "react";
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

export interface EsriComponentProps {
    componentRef?: React.MutableRefObject<EsriComponentElement>;
    containerProps?: BoxProps;
    view?: MapOrSceneView;
}

interface EsriComponentWrapperProps {
    children?: ReactNode;
    tag: string;
    innerRef: (instance: HTMLElement) => void;
    componentRef?: React.MutableRefObject<EsriComponentElement>;
    containerProps?: BoxProps;
    view?: MapOrSceneView;
    [x: string]: unknown;
}

export type EsriComponentElement = HTMLElement & {
    [x: string]: unknown;
};

const isEventListener = (prop: unknown): prop is EventListenerOrEventListenerObject => typeof prop === "function";

const EsriComponentWrapper: FC<EsriComponentWrapperProps> = ({
    componentRef,
    containerProps: { sx, ...containerProps } = {},
    view,
    tag,
    innerRef,
    children,
    ...widgetProps
}) => {
    const [componentElement, setComponentElement] = useState<EsriComponentElement>(undefined);

    const componentProps: { [x: string]: unknown } = useMemo(
        () =>
            view
                ? { referenceElement: { view, componentOnReady: () => Promise.resolve() }, ...widgetProps }
                : widgetProps,
        [view, widgetProps]
    );

    const previousProps = usePrevious(componentProps);

    const addEventListener = useCallback(
        (name: string, handler: EventListenerOrEventListenerObject) => {
            componentElement?.addEventListener(name, handler);
        },
        [componentElement]
    );

    const removeEventListener = useCallback(
        (name: string, handler: EventListenerOrEventListenerObject) => {
            componentElement?.removeEventListener(name, handler);
        },
        [componentElement]
    );

    const syncProps = useCallback(
        (propsToSync: Record<string, unknown> = componentProps) => {
            if (!componentElement) {
                return;
            }
            for (const prop of Object.keys(propsToSync)) {
                if (isEventListener(propsToSync[prop])) {
                    addEventListener(prop, propsToSync[prop]);
                } else {
                    componentElement[prop] = propsToSync[prop];
                }
            }
        },
        [addEventListener, componentElement, componentProps]
    );

    // Sync updated props
    useEffect(() => {
        // Collect changed props
        const newProps: Record<string, unknown> = {};
        for (const prop of Object.keys(componentProps)) {
            if (!previousProps?.[prop] || previousProps?.[prop] !== componentProps[prop]) {
                // Remove a changed event handler
                if (isEventListener(previousProps?.[prop])) {
                    removeEventListener(prop, previousProps[prop]);
                }
                newProps[prop] = componentProps[prop];
            }
        }
        // Remove removed event handlers
        for (const prop of Object.keys(previousProps ?? {})) {
            if (!componentProps[prop] && isEventListener(previousProps[prop])) {
                removeEventListener(prop, previousProps[prop]);
            }
        }
        // Sync changed props
        syncProps(newProps);
    }, [componentProps, previousProps, removeEventListener, syncProps]);

    const cleanup = useCallback(() => {
        if (!componentElement) {
            return;
        }
        for (const prop of Object.keys(componentProps)) {
            if (isEventListener(componentProps[prop])) {
                removeEventListener(prop, componentProps[prop]);
            }
        }
        setComponentElement(undefined);
    }, [componentElement, componentProps, removeEventListener]);

    const setRef = useCallback(
        (element: HTMLElement) => {
            if (element) {
                if (element !== componentElement) {
                    cleanup();
                }
                componentRef.current = element as EsriComponentElement;
                setComponentElement(element as EsriComponentElement);
                syncProps();
            } else {
                cleanup();
            }
            innerRef?.(element);
        },
        [cleanup, componentElement, componentRef, innerRef, syncProps]
    );

    return (
        <Box
            sx={{
                "--calcite-font-size--3": "1rem",
                "--calcite-font-size--2": "1.2rem",
                "--calcite-font-size--1": "1.4rem",
                "--calcite-font-size-0": "1.6rem",
                "--calcite-font-size-1": "1.8rem",
                "--calcite-font-size-2": "2rem",
                "--calcite-font-size-3": "2.6rem",
                "--calcite-font-size-4": "3.2rem",
                "--calcite-font-size-5": "4rem",
                "--calcite-font-size-6": "4.8rem",
                "--calcite-font-size-7": "5.6rem",
                "--calcite-font-size-8": "6.4rem",
                "--calcite-font-size-relative-xs": "1rem",
                "--calcite-font-size-relative-sm": "1.2rem",
                "--calcite-font-size-relative-md": "1.6rem",
                "--calcite-font-size-relative-lg": "1.8rem",
                "--calcite-font-size-relative-base": "1.4rem",
                "--calcite-font-line-height-relative-snug": "1.375",
                "--calcite-font-line-height-sm": "1.6rem",
                ...sx,
            }}
            {...containerProps}
        >
            {React.createElement(
                tag,
                {
                    ref: (element: HTMLElement) => setRef(element),
                },
                children
            )}
        </Box>
    );
};

export const wrapComponent = <T extends EsriComponentProps>(tag: string) =>
    forwardRef<HTMLElement>(({ containerProps, ...props }: T, ref) => (
        <EsriComponentWrapper
            containerProps={containerProps}
            tag={tag}
            innerRef={ref as (instance: HTMLElement) => void}
            {...props}
        />
    )) as React.ForwardRefExoticComponent<
        React.PropsWithoutRef<T & React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>
    >;
