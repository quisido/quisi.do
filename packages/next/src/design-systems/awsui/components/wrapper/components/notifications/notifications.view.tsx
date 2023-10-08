import type { FlashbarProps } from '@awsui/components-react/flashbar';
import Flashbar from '@awsui/components-react/flashbar';
import type { ReactElement } from 'react';
import type Notification from '../../../../../../types/notification';
import useNotifications from './notifications.hook';

interface Props {
  readonly children: readonly Notification[] | undefined;
}

const EMPTY = 0;

export default function AwsuiWrapperNotifications({
  children,
}: Props): ReactElement | null {
  const items: readonly FlashbarProps.MessageDefinition[] =
    useNotifications(children);

  if (items.length === EMPTY) {
    return null;
  }

  return <Flashbar items={items} />;
}
