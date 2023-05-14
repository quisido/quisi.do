import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';

interface Props {
  readonly error: string | null;
  readonly events: readonly string[];
  readonly initiated: boolean;
  readonly loading: boolean;
}

const mapStringToListItem = (str: string): ReactElement => (
  <li key={str}>{str}</li>
);

export default function Events({
  error,
  events,
  initiated,
  loading,
}: Readonly<Props>): ReactElement {
  if (!initiated) {
    return (
      <Container header={<I18n>Events</I18n>} marginTop="large">
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Events</I18n>} marginTop="large">
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Events</I18n>} marginTop="large">
        <LoadingIcon /> <I18n>Loading events</I18n>
      </Container>
    );
  }

  return (
    <Container
      header={<I18n count={events.length}>Events ($count)</I18n>}
      marginTop="large"
    >
      <ol>{events.map(mapStringToListItem)}</ol>
    </Container>
  );
}
