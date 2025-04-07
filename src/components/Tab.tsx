import { LightningIcon } from "@storybook/icons";
import React, { useCallback } from "react";
import { Code, H1, IconButton, Link } from "storybook/internal/components";
import { useGlobals, useParameter, useStorybookState } from "storybook/internal/manager-api";
import { styled } from "storybook/internal/theming";

import { KEY } from "../constants";
import { useCssViewer } from 'src/hooks/useCssViewer';

interface TabProps {
  active: boolean;
}

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
});

export const Tab: React.FC<TabProps> = ({ active }) => {
  const { storyId } = useStorybookState(); // Récupère l'ID de la story active
  const cssContent = useCssViewer(storyId); // Récupère le CSS du composant actif

  if (!active) {
    return null;
  }

  return (
    <TabWrapper>
      <TabInner>
        <H1>CSS Viewer</H1>
        <p>Voici le CSS du composant actif :</p>
        {cssContent ? (
          <Code>{cssContent}</Code>
        ) : (
          <p>Aucun CSS disponible pour ce composant.</p>
        )}
      </TabInner>
    </TabWrapper>
  );
};
