// (C) 2021 GoodData Corporation
import {
    DashboardContext,
    DashboardPluginV1,
    IDashboardCustomizer,
    IDashboardEventHandling,
    IDashboardWidgetProps,
    newDashboardItem,
    newCustomWidget,
} from "@gooddata/sdk-ui-dashboard";
// @ts-ignore
import cats from "./cats.jpeg";

import packageJson from "../../package.json";
import React from "react";

/*
 * Component to render 'myPhotoWidget'
 */
function MyPhotoWidget(_props: IDashboardWidgetProps): JSX.Element {
    return <img alt="cats" src={cats} style={{
        maxHeight: 400,
        maxWidth: '100%',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        boxShadow: '0px 0px 15px 0px #000000',
    }}/>;
}

export class Plugin extends DashboardPluginV1 {
    public readonly author = packageJson.author;
    public readonly displayName = packageJson.name;
    public readonly version = packageJson.version;

    public register(
        _ctx: DashboardContext,
        customize: IDashboardCustomizer,
        _handlers: IDashboardEventHandling,
    ): void {
        customize.customWidgets().addCustomWidget("myPhotoWidget", MyPhotoWidget);
        customize.layout().customizeFluidLayout((_layout, customizer) => {
            const cats = newDashboardItem(newCustomWidget("myWidget1", "myPhotoWidget"), {
                xl: {
                    // all 12 columns of the grid will be 'allocated' for this this new item
                    gridWidth: 4,
                    // minimum height since the custom widget now has just some one-liner text
                    gridHeight: 1,
                },
            });

            customizer.addItem(0, 1, cats);
        });
    }
}
