import React from "react";
import { addons, types } from "storybook/internal/manager-api";
import { Tab } from "./components/Tab";
import { CONFIG_FILE } from './constants';


// Register the addon
addons.register("CSS-viewer", (api) => {
  addons.add("CSS-viewer/tab", {
    type: types.TAB,
    title: "CSS",
    render: ({ active }) => <Tab active={active} />,
    paramKey: CONFIG_FILE
  });
});
