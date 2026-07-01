import { addons, types } from "storybook/manager-api";
import { ADDON_ID, TAB_ID, TAB_TITLE } from './constants';
import { Tab } from './components/Tab';

let shadowRoot: ShadowRoot | null = null;

// Register the addon
addons.register(ADDON_ID, (api) => {
  addons.add(TAB_ID, {
    type: types.TAB,
    title: TAB_TITLE,
    render: ({ active }: { active?: boolean }) => <Tab active={Boolean(active || false)} />
    // match: ({ viewMode }) => viewMode === 'story',
    // render: ({ active }) => (
      // <AddonPanel active={active}>
        // <TabPanel active={active}></TabPanel>
      // </AddonPanel>
    
  });
});
