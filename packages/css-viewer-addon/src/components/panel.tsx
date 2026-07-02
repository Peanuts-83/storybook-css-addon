import React, { useLayoutEffect, useState } from "react";
import { Code } from "storybook/internal/components";
import { useParameter, useStorybookState } from "storybook/manager-api";
import { styled } from "storybook/theming";
import { useCssViewer } from '../hooks/useCssViewer';
import { CssViewerConfig } from '../types';

interface PanelProps {
  active: boolean;
}

const PanelWrapper = styled.div(({ theme }) => ({
  background: theme?.background?.content || 'transparent', 
  minHeight: '100%', 
  boxSizing: 'border-box', 
  padding: 16, 
  overflow: 'auto'
}));

const PanelInner = styled.div({
  width: '100%'
});

export const Panel: React.FC<PanelProps> = ({active}) => {
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

  const cssText =
    typeof cssContent === 'string'
      ? cssContent
      : cssContent == null
        ? ''
        : React.isValidElement(cssContent)
          ? '[ERROR] cssContent is a React element, expected string'
          : String(cssContent);

  return (
    <PanelWrapper>
      <PanelInner>
        {cssText ? (
          <Code>{cssText}</Code>
        ) : (
          <p>No style available for this story.</p>
        )}
      </PanelInner>
    </PanelWrapper>
  );
};
