import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneLabel,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxThemeViewerReactWebPartStrings';
import SpfxThemeViewerReact from './components/SpfxThemeViewerReact';
import { ISpfxThemeViewerReactProps } from './components/ISpfxThemeViewerReactProps';

export interface ISpfxThemeViewerReactWebPartProps {
    description: string;
}

declare global {
    interface Window {
        __themeState__: any;
    }
}

export default class SpfxThemeViewerReactWebPart extends BaseClientSideWebPart<ISpfxThemeViewerReactWebPartProps> {

    public render(): void {
        const element: React.ReactElement<ISpfxThemeViewerReactProps> = React.createElement(
            SpfxThemeViewerReact,
            {
                themes: window.__themeState__.theme
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneLabel('description', {
                                    text: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
