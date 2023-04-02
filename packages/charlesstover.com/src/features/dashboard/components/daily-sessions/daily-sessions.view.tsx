import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import Div from '../../../../components/div';

interface Props {
  readonly children: number;
}

const NONE = 0;
const SINGLE = 1;

export default function DailySessions({
  children,
}: Readonly<Props>): ReactElement | null {
  if (children === NONE) {
    return null;
  }

  if (children === SINGLE) {
    return (
      <Div>
        <I18n>1 session/day</I18n>
      </Div>
    );
  }

  return (
    <Div>
      <I18n count={children}>$count sessions/day</I18n>
    </Div>
  );
}
