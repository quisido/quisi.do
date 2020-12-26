import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { ToggleProps } from '@awsui/components-react/toggle';
import { useCallback, useState } from 'react';

interface Props {
  defaultChecked?: ToggleProps['checked'];
}

interface State {
  checked: ToggleProps['checked'];
  handleChange: Required<ToggleProps>['onChange'];
}

const DEFAULT_PROPS: Props = Object.freeze(Object.create(null));

export default function useToggle(props: Props = DEFAULT_PROPS): State {
  const { defaultChecked = false } = props;

  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = useCallback(
    (e: NonCancelableCustomEvent<ToggleProps.ChangeDetail>): void => {
      setChecked(e.detail.checked);
    },
    [],
  );

  return {
    checked,
    handleChange,
  };
}
