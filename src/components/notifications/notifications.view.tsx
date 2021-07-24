import type { FlashbarProps } from '@awsui/components-react/flashbar';
import Flashbar from '@awsui/components-react/flashbar';
import type { ReactElement } from 'react';

interface Props {
  readonly children?: readonly FlashbarProps.MessageDefinition[];
}

const EMPTY = 0;

export default function Notifications({
  children,
}: Props): ReactElement | null {
  if (typeof children === 'undefined' || children.length === EMPTY) {
    return null;
  }

  return <Flashbar items={children} />;
}
