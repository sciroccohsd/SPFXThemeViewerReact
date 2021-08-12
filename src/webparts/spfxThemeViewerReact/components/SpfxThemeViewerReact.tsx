import * as React from 'react';
import styles from './SpfxThemeViewerReact.module.scss';
import { ISpfxThemeViewerReactProps } from './ISpfxThemeViewerReactProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { render } from 'react-dom';

export default class SpfxThemeViewerReact extends React.Component<ISpfxThemeViewerReactProps, {}> {
    constructor(props) {
        super(props);

        // init state (bind data)
        this.state = {
            themeState: this.props.themes
        };

        // set state (trigger update)
        window["setThemeState"] = (name: string, value: string) => {
            this.props.themes[name] = value;
            this.setState({
                themeState: this.props.themes
            });
        };
    }

    public render(): React.ReactElement<ISpfxThemeViewerReactProps> {
        let links: {title: string, href: string}[] = [
            {
                title: "Designing great SharePoint experiences - Overview (MS Docs)",
                href: "https://docs.microsoft.com/en-us/sharepoint/dev/design/design-guidance-overview"
            },
            {
                title: "SharePoint themes and colors (MS Docs)",
                href: "https://docs.microsoft.com/en-us/sharepoint/dev/design/themes-colors"
            }
        ];
        let names = Object.keys(this.state["themeState"]);

        return (
            <div className={styles.spfxThemeViewerReact}>
                <div className={ styles.warning }>NOTE: Not all theme names are available to every SPO theme set.</div>
                <div>Example: {'{'} background-color: "[theme: bodyBackground, default:#ffffff]"; {'}'}</div>
                <div>Theme values from: window.__themeState__.theme</div>
                {
                    links.map( link => (
                        <a className={ styles.link } href={ link.href } target="_blank">{ link.title }</a>
                    ))
                }
                <div className={ styles.container }>
                    {
                        names.sort().map(name => (
                            this.themeBox(name, this.state["themeState"][name])
                        ))
                    }
                </div>
            </div>
        );

    }

    private themeBox(name: string, value: string): React.ReactElement {
        return (
            <div className={ styles.boxWrapper }>
                <div>{ name }</div>
                <div className={ styles.box } style={ {backgroundColor: value} }></div>
                <div className={ styles.display }>
                    { name } : { value }
                    <div className={styles.themeText}>{`"[theme: ${name}, default:${value}]"`}</div>
                </div>
            </div>
        );
    }
}

