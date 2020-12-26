import { AppLayoutProps } from '@awsui/components-react/app-layout';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface Props {
  defaultNavigationOpen?: AppLayoutProps['navigationOpen'];
  defaultToolsOpen?: AppLayoutProps['toolsOpen'];
}

interface State {
  handleNavigationChange: Required<AppLayoutProps>['onNavigationChange'];
  handleToolsChange: Required<AppLayoutProps>['onToolsChange'];
  navigationOpen: AppLayoutProps['navigationOpen'];
  setNavigationOpen: Dispatch<SetStateAction<AppLayoutProps['navigationOpen']>>;
  setToolsOpen: Dispatch<SetStateAction<AppLayoutProps['toolsOpen']>>;
  toolsOpen: AppLayoutProps['toolsOpen'];
}

const EMPTY_PROPS: Props = Object.freeze(Object.create(null));

export default function useAppLayout(props: Props = EMPTY_PROPS): State {
  const { defaultNavigationOpen, defaultToolsOpen } = props;

  const [navigationOpen, setNavigationOpen] = useState(defaultNavigationOpen);
  const [toolsOpen, setToolsOpen] = useState(defaultToolsOpen);

  const handleNavigationChange = useCallback(
    (e: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>): void => {
      setNavigationOpen(e.detail.open);
    },
    [],
  );

  const handleToolsChange = useCallback(
    (e: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>): void => {
      setToolsOpen(e.detail.open);
    },
    [],
  );

  return {
    handleNavigationChange,
    handleToolsChange,
    navigationOpen,
    setNavigationOpen,
    setToolsOpen,
    toolsOpen,
  };
}
