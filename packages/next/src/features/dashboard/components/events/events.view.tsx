import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import LoadingIcon from '../../../../components/loading-icon/index.js';
import Section from '../../../../components/section.js';
import Span from '../../../../components/span/index.js';

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
}: Props): ReactElement {
  if (!initiated) {
    return (
      <Section header={<I18n>Events</I18n>}>
        <I18n>Initiating</I18n>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section header={<I18n>Events</I18n>}>
        <LoadingIcon /> <I18n>Loading events</I18n>
      </Section>
    );
  }

  if (error !== null) {
    return (
      <Section header={<I18n>Events</I18n>}>
        <Span element="p">{error}</Span>
      </Section>
    );
  }

  return (
    <Section header={<I18n count={events.length}>Events ($count)</I18n>}>
      <ol>{events.map(mapStringToListItem)}</ol>
    </Section>
  );
}
