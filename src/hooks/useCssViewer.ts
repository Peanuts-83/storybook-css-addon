import { useEffect, useState } from "react";

export const useCssViewer = (componentId: string) => {
    const [css, setCss] = useState<string>("");

    useEffect(() => {
        const fetchCss = async () => {
            try {
                if (!componentId) {
                    throw new Error('no componentId!')
                } else {
                    console.log('id du compo ' + componentId + `, fichier less: "./assets/${componentId.split('-')[1]}.css"`)
                }
                const response = await fetch(`./assets/${componentId.split('-')[1]}.css`);
                if (!response.ok) {
                    console.error(response)
                    throw new Error(`Erreur lors du chargement du CSS : ${response.statusText}`);
                }
                const cssText = await response.text();
                setCss(cssText);
            } catch (error) {
                console.error("Erreur lors de la récupération du CSS :", error);
                setCss("Impossible de charger le CSS.");
            }
        };

        fetchCss();
    }, [componentId]);

    return css;
};