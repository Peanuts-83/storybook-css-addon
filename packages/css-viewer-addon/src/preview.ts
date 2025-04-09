import type { ProjectAnnotations, Renderer } from "storybook/internal/types";
import { withRoundTrip } from "./withRoundTrip";

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withRoundTrip]
};

export default preview;
