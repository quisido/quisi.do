import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';

export interface Props {
  readonly error: string | null;
  readonly frustrated: Record<string, number>;
  readonly initiated: boolean;
  readonly loading: boolean;
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

export default function Apdex({
  error,
  frustrated,
  initiated,
  loading,
  satisfied,
  tolerated,
}: Props): ReactElement {
  if (!initiated) {
    return <I18n>Initiating</I18n>;
  }

  if (error !== null) {
    return (
      <Div>
        <Span>An error occurred.</Span>
        <Span>{error}</Span>
      </Div>
    );
  }

  if (loading) {
    return (
      <>
        <LoadingIcon /> <I18n>Loading Application Performance Index</I18n>
      </>
    );
  }

  return (
    <>
      <Div>Frustrated: {JSON.stringify(frustrated)}</Div>
      <Div>Tolerated: {JSON.stringify(tolerated)}</Div>
      <Div>Satisfied: {JSON.stringify(satisfied)}</Div>
    </>
  );
}
