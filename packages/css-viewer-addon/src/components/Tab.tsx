import React, { useEffect, useLayoutEffect, useState } from "react";
import { Code } from "storybook/internal/components";
import { useParameter, useStorybookState } from "storybook/manager-api";
import { styled } from "storybook/theming";
import { useCssViewer } from '../hooks/useCssViewer';
import { CssViewerConfig } from 'src/types';

interface TabProps {
  active: boolean;
}

const TabWrapper = styled.div(({ theme }) => ({
  background: theme?.background?.content || 'transparent',
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
  const [config, setConfig] = useState<CssViewerConfig|null>(null)
  const cvc: CssViewerConfig = useParameter("cssViewerConfig")
  
  useLayoutEffect(() => {
    if (cvc) {
      setConfig(cvc)
    }
  }, [cvc, storyId])
  
  let cssContent = useCssViewer(active, storyId, config); // Get style

  if (!active || config?.ignore?.some(e => storyId.includes(e))) {
    console.error('[ERROR] active :' + active + ' / ignore :' + config?.ignore)
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
