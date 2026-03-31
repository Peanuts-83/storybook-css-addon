import { addons, types, useStorybookState, useParameter } from 'storybook/manager-api';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Code } from 'storybook/internal/components';
import { styled } from 'storybook/theming';
import { jsx } from 'react/jsx-runtime';

// src/manager.tsx
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
var TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  minHeight: "100vh",
  boxSizing: "border-box",
  position: "absolute",
  top: 0
}));
var TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "4rem"
});
var Tab = ({ active }) => {
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
    return null;
  }
  return /* @__PURE__ */ jsx(TabWrapper, { children: /* @__PURE__ */ jsx(TabInner, { children: cssContent ? /* @__PURE__ */ jsx(Code, { children: cssContent }) : /* @__PURE__ */ jsx("p", { children: "No style available for this story." }) }) });
};

// src/constants.ts
var ADDON_ID = "storybook-css-display";
var TAB_ID = `${ADDON_ID}/tab`;
var TAB_TITLE = `CSS`;
addons.register(ADDON_ID, (api) => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: TAB_TITLE,
    render: ({ active }) => /* @__PURE__ */ jsx(Tab, { active: Boolean(active || false) })
  });
});
//# sourceMappingURL=manager.js.map
//# sourceMappingURL=manager.js.map