import { useEffect, useState } from "react";
import { cssViewerConfigs as cvc } from "../config/css-viewer-conf"; 


export const useCssViewer = (componentId: string) => {
    const [css, setCss] = useState<string>("");

    useEffect(() => {
        const fetchCss = async () => {
            try {
                if (!componentId) {
                    throw new Error('no story id !');
                } else {
                    console.log('story id ' + componentId + `, style file name: "./assets/${cvc.prefix}${componentId.replace(cvc.ignorePrefix, "").split('--')[0]}.[ext]"`);
                }
                const baseName = cvc.prefix + componentId.replace(cvc.ignorePrefix, "").split('--')[0];
                const extensions = ['css', 'less', 'sass', 'scss', 'styl'];
                let cssText = '';
                let fileFound = false;

                for (const ext of extensions) {
                    try {
                        const response = await fetch(`./assets/${cvc.prefix}${baseName}.${ext}`);
                        if (response.ok) {
                            cssText = await response.text();
                            fileFound = true;
                            break;
                        }
                    } catch (err) {
                        console.warn(`Failed to fetch ./assets/${cvc.prefix}${baseName}.${ext}:`, err);
                    }
                }

                if (!fileFound) {
                    throw new Error('No style file found for this story.');
                }

                setCss(cssText);
            } catch (error) {
                console.error(error);
                setCss("No style available for this story.");
            }
        };

        fetchCss();
    }, [componentId]);

    return css;
};