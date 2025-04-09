import { useEffect, useState } from "react";
import { CssViewerConfig } from 'src/types';


export const useCssViewer = (active: boolean, componentId?: string, config?: CssViewerConfig) => {
    const [css, setCss] = useState<string>("");
    const [ext, setExt] = useState<string>("css")

    useEffect(() => {
        if (config?.format) {
            setExt(config.format)
        }
    }, [config])

    useEffect(() => {
        const fetchCss = async () => {
            try {
                if (!componentId) {
                    throw new Error('no story id !');
                } else if (!config) {
                    throw new Error('no config available !')
                } else if (!ext) {
                    throw new Error('no extension available !')
                } 
                const baseName = config.prefix + componentId.replace(config.ignorePrefix, "").split('--')[0];
                let cssText = '';    
                try {
                    const response = await fetch(`./assets/${config.prefix}${baseName}.${ext}`);
                    if (response.ok) {
                        cssText = await response.text();
                    }
                } catch (err) {
                    console.warn(`Failed to fetch ./assets/${config.prefix}${baseName}.${ext}:`, err);
                } 
                setCss(cssText);
            } catch (error) {
                // console.error(error.message);
                setCss("No style available for this story.");
            }
        };

        fetchCss();
        
    }, [componentId, active, config]);

    return css;
};