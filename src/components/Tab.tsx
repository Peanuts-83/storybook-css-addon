import React from "react";
import { Code } from "storybook/internal/components";
import { useStorybookState } from "storybook/internal/manager-api";
import { styled } from "storybook/internal/theming";
import { useCssViewer } from '../hooks/useCssViewer';

interface TabProps {
  active: boolean;
}

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  minHeight: "100vh",
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "4rem"
});

export const Tab: React.FC<TabProps> = ({active}) => {
  const { storyId } = useStorybookState(); // Get active story ID
  const cssContent = useCssViewer(storyId); // Get style

  if (!active || storyId.includes('introduction')) {
    return null;
  }

  return (
    <TabWrapper>
      <TabInner>
        {cssContent ? (
          <Code>{cssContent}</Code>
        ) : (
          <p>No style available for this story.</p>
        )}
      </TabInner>
    </TabWrapper>
  );
};
