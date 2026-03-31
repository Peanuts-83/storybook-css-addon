import { useChannel, useEffect } from 'storybook/internal/preview-api';

// src/withRoundTrip.ts

// src/constants.ts
var ADDON_ID = "storybook-css-display";
var EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`
};

// src/withRoundTrip.ts
var check = (canvas = globalThis.document) => {
  const divs = canvas.querySelectorAll("div");
  const all = canvas.querySelectorAll("*");
  return {
    divs: Array.from(divs).filter((element) => element.childNodes.length < 2).map((div) => div.getBoundingClientRect()),
    styled: Array.from(all).filter((element) => element.hasAttribute("style")).map((element) => element.getBoundingClientRect())
  };
};
var withRoundTrip = (storyFn, context) => {
  const canvasElement = context.canvasElement;
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, check(canvasElement));
    }
  });
  useEffect(() => {
    emit(EVENTS.RESULT, check(canvasElement));
  });
  return storyFn();
};

// src/preview.ts
var preview = {
  decorators: [withRoundTrip]
};
var preview_default = preview;

export { preview_default as default };
//# sourceMappingURL=preview.js.map
//# sourceMappingURL=preview.js.map