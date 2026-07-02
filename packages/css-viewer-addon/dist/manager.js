import { addons, types, useStorybookState, useParameter } from 'storybook/manager-api';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { AddonPanel, Code } from 'storybook/internal/components';
import { styled } from 'storybook/theming';
import { jsx } from 'react/jsx-runtime';

// src/manager.tsx

// src/constants.ts
var ADDON_ID = "storybook-css-display";
var PANEL_ID = `${ADDON_ID}/panel`;
var PANEL_TITLE = `CSS`;
var useCssViewer = (active, componentId, config) => {
  const [css, setCss] = useState("");
  useEffect(() => {
    const fetchCss = async () => {
      let debugMode = config?.debug || false;
      try {
        if (!componentId) {
          throw new Error("no story id !");
        } else if (!config) {
          throw new Error("no config available !");
        } else if (!config.format) {
          throw new Error("no extension format available !");
        }
        let baseName = componentId;
        if (config.fileRegex) {
          const regex = new RegExp(config.fileRegex.in);
          if (regex.test(baseName)) {
            debugMode && console.log(`Regex [${JSON.stringify(config.fileRegex)}] applying to : ${baseName}`);
            baseName = baseName.replace(regex, config.fileRegex.out);
          } else {
            debugMode && console.warn(`Regex did not match: ${config.fileRegex.in}, storyId: ${componentId}`);
          }
        } else {
          baseName = baseName.split("--")[0];
        }
        debugMode && console.log(`Style file name: ${baseName}.${config.format}`);
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
var PanelWrapper = styled.div(({ theme }) => ({
  background: theme?.background?.content || "transparent",
  minHeight: "100%",
  boxSizing: "border-box",
  padding: 16,
  overflow: "auto"
}));
var PanelInner = styled.div({
  width: "100%"
});
var Panel = ({ active }) => {
  const { storyId } = useStorybookState();
  const [config, setConfig] = useState(null);
  const cvc = useParameter("cssViewerConfig");
  useLayoutEffect(() => {
    if (cvc) {
      setConfig(cvc);
    }
  }, [cvc, storyId]);
  let cssContent = useCssViewer(active, storyId, config);
  if (!active || config?.ignore?.some((e) => storyId.includes(e))) {
    console.error("[ERROR] active :" + active + " / ignore :" + config?.ignore);
    return null;
  }
  const cssText = typeof cssContent === "string" ? cssContent : cssContent == null ? "" : React.isValidElement(cssContent) ? "[ERROR] cssContent is a React element, expected string" : String(cssContent);
  return /* @__PURE__ */ jsx(PanelWrapper, { children: /* @__PURE__ */ jsx(PanelInner, { children: cssText ? /* @__PURE__ */ jsx(Code, { children: cssText }) : /* @__PURE__ */ jsx("p", { children: "No style available for this story." }) }) });
};
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    render: ({ active }) => /* @__PURE__ */ jsx(AddonPanel, { active: Boolean(active), children: /* @__PURE__ */ jsx(Panel, { active: Boolean(active) }) })
  });
});
//# sourceMappingURL=manager.js.map
//# sourceMappingURL=manager.js.map