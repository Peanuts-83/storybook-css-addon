import { useEffect, useState } from "react";

export const useCssViewer = (componentId: string) => {
    const [css, setCss] = useState<string>("");

    useEffect(() => {
        const fetchCss = async () => {
            try {
                if (!componentId) {
                    throw new Error('no componentId!')
                } else {
                    console.log(componentId)
                }
                const response = await fetch(`./${componentId.split('-')[1]}.less`);
                console.log(response)
                const cssText = await response.text();
                setCss(cssText);
                console.log(cssText)
            } catch (error) {
                console.error("Failed to fetch CSS:", error);
                return ''
            }
        };

        fetchCss();
    }, [componentId]);

    return css;
};