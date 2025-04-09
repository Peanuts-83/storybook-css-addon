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
      /** prefix added to style file name */
      prefix: "",
      /** prefix to ignore for style file name */
      ignorePrefix: "example-",
      /** file format css|less|sass|scss|styl */
      format: FORMAT.CSS,
      /** stories to ignore */
      ignore: ['introduction']
    }
  },
  initialGlobals: {
    background: { value: "light" },
  },
};
export default preview;
