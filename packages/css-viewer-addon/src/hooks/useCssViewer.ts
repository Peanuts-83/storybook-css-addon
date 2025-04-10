import { useEffect, useState } from "react";
import { FORMAT } from 'src/constants';
import { CssViewerConfig } from 'src/types';


export const useCssViewer = (active: boolean, componentId?: string, config?: CssViewerConfig) => {
    const [css, setCss] = useState<string>("");
    const [ext, setExt] = useState<string>("css")

    useEffect(() => {
        if (config?.format) {
            setExt(config.format)
        } else {
            setExt(FORMAT.CSS)
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
                console.log(`id: ${componentId}, config: ${JSON.stringify(config)}`)
                const {prefix, ignorePrefix} = config
                const baseName = (prefix || '') + componentId.replace(ignorePrefix || "", "").split('--')[0];
                let cssText = "";    
                try {
                    const response = await fetch(`./assets/styles/${prefix || ""}${baseName}.${ext}`);
                    if (response.ok) {
                        cssText = await response.text();
                    }
                } catch (err) {
                    console.warn(`Failed to fetch ./assets/styles/${prefix || ""}${baseName}.${ext}:`, err);
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