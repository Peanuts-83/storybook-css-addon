// src/preset.ts
var viteFinal = async (config, options) => {
  console.log("This addon is augmenting the Vite config");
  if (options.configType === "DEVELOPMENT")
    console.log("[addon-css-viewer] viteFinal in devlopment mode.");
  return config;
};
var webpack = async (config) => {
  console.log("This addon is augmenting the Webpack config");
  return config;
};

export { viteFinal, webpack };
//# sourceMappingURL=preset.js.map
//# sourceMappingURL=preset.js.map