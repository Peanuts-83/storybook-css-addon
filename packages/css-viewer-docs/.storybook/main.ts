import type { StorybookConfig } from "@storybook/react-vite";
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { mergeConfig, UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-css-viewer"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [{ from: '../src/stylesForPreview', to:'assets/stylesForPreview'}],

  async viteFinal(config: UserConfig) {
    return mergeConfig(config, {
      plugins: [viteTsConfigPaths()],
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          }
        }
      },
      // addon-docs fix for import from file:/// >> not ESM compatible
      resolve: {
        alias: [
          {
            // ⬇ match any addon-docs/dist/mdx-react-shim.js
            find: /@storybook\/addon-docs\/dist\/mdx-react-shim\.js$/,
            // ⬇ replace with clean sub-path exported
            replacement: '@storybook/addon-docs/mdx-react-shim',
          },
        ],

      }
    });
  },
};
export default config;
