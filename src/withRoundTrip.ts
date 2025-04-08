import { Result } from "./types";
import { useEffect } from "storybook/internal/preview-api";
import { useChannel } from "storybook/internal/preview-api";
import type { DecoratorFunction } from "storybook/internal/types";
import { CONFIG_FILE, EVENTS } from "./constants";

const getParameter = (parameters: any, key: string, defaultValue: any) => {
  return parameters[key] || defaultValue;
};

/**
 * This is an example of a function that performs some sort of analysis on the
 * canvas. In this example, it returns the bounding rectangles for elements that
 * - have a style attribute
 * - are divs with fewer than 2 childNodes
 */
const check = (canvas: ParentNode = globalThis.document): Result => {
  const divs = canvas.querySelectorAll("div");
  const all = canvas.querySelectorAll("*");

  return {
    divs: Array.from(divs)
      .filter((element) => element.childNodes.length < 2)
      .map((div) => div.getBoundingClientRect()),
    styled: Array.from(all)
      .filter((element) => element.hasAttribute("style"))
      .map((element) => element.getBoundingClientRect()),
  };
};

export const withRoundTrip: DecoratorFunction = (storyFn, context) => {
  const { parameters } = context
  const cssViewerConfigs = getParameter(parameters, CONFIG_FILE, {
    prefix: "",
    ignorePrefix: ""
  })

  const canvasElement = context.canvasElement as ParentNode;
  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      emit(EVENTS.RESULT, check(canvasElement));
    },
  });
  useEffect(() => {
    emit(EVENTS.RESULT, check(canvasElement));
  });

  return storyFn(cssViewerConfigs);
};
