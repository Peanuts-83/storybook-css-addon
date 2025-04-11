import { useEffect, useState } from "react";
import { CssViewerConfig } from 'src/types';


export const useCssViewer = (active: boolean, componentId?: string, config?: CssViewerConfig) => {
    const [css, setCss] = useState<string>("");

    useEffect(() => {
        const fetchCss = async () => {
            let debugMode = config?.debug || false
            try {
                if (!componentId) {
                    throw new Error('no story id !');
                } else if (!config) {
                    throw new Error('no config available !')
                } else if (!config.format) {
                    throw new Error('no extension format available !')
                } 
                let baseName: string = componentId
                if (config.fileRegex) {
                    const regex = new RegExp(config.fileRegex.in)
                    if (regex.test(baseName)) {
                        debugMode && console.log(`Regex [${JSON.stringify(config.fileRegex)}] applying to : ${baseName}`)
                        baseName = baseName.replace(regex, config.fileRegex.out);
                    } else {
                        debugMode && console.warn(`Regex did not match: ${config.fileRegex.in}, storyId: ${componentId}`);
                    }
                } else {
                    baseName = baseName.split('--')[0];
                }
                debugMode && console.log(`Style file name: ${baseName}.${config.format}`)
                
                let cssText = "";    
                try {
                    const response = await fetch(`./assets/stylesForPreview/${baseName}.${config.format}`);
                    if (response.ok) {
                        cssText = await response.text();
                    }
                } catch (err) {
                    debugMode && console.warn(`Failed to fetch ./assets/stylesForPreview/${baseName}.${config.format}:`, err);
                } 
                setCss(cssText);
            } catch (error) {
                debugMode && console.error(error);
                setCss("No style available for this story.");
            }
        };

        fetchCss();
        
    }, [componentId, active, config]);

    return css;
};