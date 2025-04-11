import { useEffect, useState } from "react";
import { FORMAT } from 'src/constants';
import { CssViewerConfig } from 'src/types';


export const useCssViewer = (active: boolean, componentId?: string, config?: CssViewerConfig) => {
    const [css, setCss] = useState<string>("");

    useEffect(() => {
        const fetchCss = async () => {
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
                        baseName = baseName.replace(regex, config.fileRegex.out);
                    } else {
                        console.warn(`Regex did not match: ${config.fileRegex.in}, storyId: ${componentId}`);
                    }
                } else {
                    baseName = baseName.split('--')[0];
                }
                
                let cssText = "";    
                try {
                    const response = await fetch(`./assets/stylesForPreview/${baseName}.${config.format}`);
                    if (response.ok) {
                        cssText = await response.text();
                    }
                } catch (err) {
                    console.warn(`Failed to fetch ./assets/stylesForPreview/${baseName}.${config.format}:`, err);
                } 
                setCss(cssText);
            } catch (error) {
                console.error(error.message);
                setCss("No style available for this story.");
            }
        };

        fetchCss();
        
    }, [componentId, active, config]);

    return css;
};