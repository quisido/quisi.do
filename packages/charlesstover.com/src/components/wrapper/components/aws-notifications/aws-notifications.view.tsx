import type { FlashbarProps } from '@awsui/components-react/flashbar';
import Flashbar from '@awsui/components-react/flashbar';
import type { ReactElement } from 'react';
import type Notification from '../../../../types/notification';
import useAwsNotifications from './aws-notifications.hook';

interface Props {
  readonly children: readonly Notification[] | undefined;
}

const EMPTY = 0;

export default function AwsWrapperNotifications({
  children,
}: Readonly<Props>): ReactElement | null {
  const items: readonly FlashbarProps.MessageDefinition[] =
    useAwsNotifications(children);

  if (items.length === EMPTY) {
    return null;
  }

  return <Flashbar items={items} />;
}
