import React from "react";
import { addons, types } from "storybook/manager-api";
import { Tab } from './components/Tab';
import { ADDON_ID, TAB_ID, TAB_TITLE } from './constants';

// Register the addon
addons.register(ADDON_ID, (api) => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: TAB_TITLE,
    render: ({ active }: { active?: boolean }) => <Tab active={Boolean(active || false)} />
  });
});
