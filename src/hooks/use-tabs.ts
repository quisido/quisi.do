import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { TabsProps } from '@awsui/components-react/tabs';
import { useCallback, useState } from 'react';

interface Props {
  defaultActiveTabId?: string;
}

interface State {
  activeTabId: TabsProps['activeTabId'];
  handleChange: Required<TabsProps>['onChange'];
}

const EMPTY_PROPS: Props = Object.freeze(Object.create(null));

export default function useTabs(props: Props = EMPTY_PROPS): State {
  const { defaultActiveTabId } = props;

  const [activeTabId, setActiveTabId] = useState(defaultActiveTabId);

  const handleChange = useCallback(
    (e: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void => {
      setActiveTabId(e.detail.activeTabId);
    },
    [],
  );

  return {
    activeTabId,
    handleChange,
  };
}
