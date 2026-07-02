import { addons, Consumer, types } from "storybook/manager-api";
import { ADDON_ID, PANEL_ID, PANEL_TITLE } from './constants';
import { Panel } from './components/panel';
import { AddonPanel } from 'storybook/internal/components';


// Register the addon
addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    render: ({ active }: { active?: boolean }) => (
      <AddonPanel active={Boolean(active)} > 
        <Panel active={Boolean(active)} />       
      </AddonPanel>)   
  });
});


