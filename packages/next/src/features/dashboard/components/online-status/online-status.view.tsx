import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import useOnlineStatus from './online-status.hook.js';

interface Props {
  readonly children: boolean;
}

export default function OnlineStatus({ children }: Props): ReactElement {
  const status: string = useOnlineStatus(children);

  return <I18n status={status}>Currently online: $status</I18n>;
}
