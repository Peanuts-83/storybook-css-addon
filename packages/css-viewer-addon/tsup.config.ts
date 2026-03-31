import { defineConfig, type Options } from "tsup";
import { execSync } from "child_process";

// The current browsers supported by Storybook v7
const BROWSER_TARGET: Options["target"] = "esnext";
const NODE_TARGET: Options["target"] = "node20.19";

export default defineConfig(async (options) => {
  // read package.json with ESM and JSON import
  const packageJson = (await import("./package.json", {
    with: {type:"json"}
  })).default;
  
  const {
    bundler: {
      managerEntries = [],
      previewEntries = [],
      nodeEntries = [],
    } = {},
  } = packageJson;

  const commonConfig: Options = {
    splitting: true,
    format: ["esm"],
    treeshake: true,
    sourcemap: !options.watch ? true : true,
    // no conditionnal clean actually recommended by Storybook
    clean: false,
    outDir: "./dist",
    // Packages from Storybook → DO NOT BUNDLE!
    external:
      [
        "react",
        "react-dom",
        "@storybook/icons",
        "storybook/manager-api",
        "storybook/preview-api",
        "react/jsx-runtime"
      ],
    onSuccess: async () => {
      // Copy after build - required for demo project
      try {
        // execSync("cp -r ./dist ../../", { stdio: "inherit" });
        // console.log("cp done : ./dist -> ../../dist");
      } catch (error) {
        console.error("cp error :", error);
      }
    },
  };

  const configs: Options[] = [];

  // manager entries are entries meant to be loaded into the manager UI
  // they'll have manager-specific packages externalized and they won't be usable in node
  // they won't have types generated for them as they're usually loaded automatically by Storybook
  if (managerEntries.length) {
    configs.push({
      ...commonConfig,
      entry: managerEntries,
      target: BROWSER_TARGET,
      platform: "browser",
    });
  }

  // preview entries are entries meant to be loaded into the preview iframe
  // they'll have preview-specific packages externalized and they won't be usable in node
  // they'll have types generated for them so they can be imported when setting up Portable Stories
  if (previewEntries.length) {
    configs.push({
      ...commonConfig,
      entry: previewEntries,
      target: BROWSER_TARGET,
      platform: "browser",
      dts: true               // types for index/preview
    });
  }

  // node entries are entries meant to be used in node-only
  // this is useful for presets, which are loaded by Storybook when setting up configurations
  // they won't have types generated for them as they're usually loaded automatically by Storybook
  if (nodeEntries.length) {
    configs.push({
      ...commonConfig,
      entry: nodeEntries,
      target: NODE_TARGET,
      platform: "node",
    });
  }

  return configs;
});
