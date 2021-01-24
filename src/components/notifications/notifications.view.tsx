import Flashbar, { FlashbarProps } from '@awsui/components-react/flashbar';
import { ReactElement } from 'react';

interface Props {
  children?: FlashbarProps.MessageDefinition[] | null;
}

export default function Notifications({
  children,
}: Props): null | ReactElement {
  if (typeof children === 'undefined' || children === null) {
    return null;
  }
  return <Flashbar items={children} />;
}
