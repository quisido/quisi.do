import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../../../components/div.js';
import LoadingIcon from '../../../../components/loading-icon.js';
import RelativeTimestamp from '../../../../components/relative-timestamp.js';

interface Props {
  readonly children: number;
  readonly error: boolean;
  readonly initiated: boolean;
  readonly loading: boolean;
}

export default function LastChecked({
  children,
  error,
  initiated,
  loading,
}: Props): ReactElement | null {
  if (error) {
    return null;
  }

  if (!initiated) {
    return <I18n>Initiating</I18n>;
  }

  if (loading) {
    return (
      <Div>
        <LoadingIcon /> <I18n>Loading uptime incidents</I18n>
      </Div>
    );
  }

  return (
    <Div>
      Last checked: <RelativeTimestamp>{children}</RelativeTimestamp>
    </Div>
  );
}
