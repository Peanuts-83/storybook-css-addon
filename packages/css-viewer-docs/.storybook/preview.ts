import type { Preview } from "@storybook/react";
import { FORMAT } from "../../css-viewer-addon/src/constants"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    cssViewerConfig: {
      /** file format css|less|sass|scss|styl */
      format: FORMAT.CSS,
      /** stories to ignore */
      ignore: ['introduction'],
      /** regex to transform story ID into file name */
      fileRegex: {
        in: "example-(.*)--.*$", 
        out: "$1"
      },
      /** debug mode activation */
      debug: true
    }
  },
  initialGlobals: {
    background: { value: "light" },
  },
};
export default preview;
