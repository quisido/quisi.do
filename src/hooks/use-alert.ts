import { AlertProps } from '@awsui/components-react/alert';
import { useCallback, useState } from 'react';

interface Props {
  defaultVisible: AlertProps['visible'];
}

interface State {
  handleDismiss: AlertProps['onDismiss'];
  visible: AlertProps['visible'];
}

const DEFAULT_PROPS: Props = Object.freeze(Object.create(null));

export default function useAlert(props: Props = DEFAULT_PROPS): State {
  const { defaultVisible } = props;

  const [visible, setVisible] = useState(defaultVisible);

  const handleDismiss = useCallback((): void => {
    setVisible(false);
  }, []);

  return {
    handleDismiss,
    visible,
  };
}
