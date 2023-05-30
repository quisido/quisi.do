import { ReactElement } from 'react';
import type SentryProjectIssue from '../../../../types/sentry-project-issue';
import Container from '../../../../components/container';
import I18n from 'lazy-i18n';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';

interface Props {
  readonly error: string | null;
  readonly initiated: boolean;
  readonly issues: readonly SentryProjectIssue[];
  readonly loading: boolean;
}

const mapIssueToListItem = (issue: SentryProjectIssue): ReactElement => {
  return <li key={issue.id}>{issue.title}</li>;
};

export default function SentryProjectIssues({
  error,
  initiated,
  issues,
  loading,
}: Readonly<Props>): ReactElement {
  if (!initiated) {
    return (
      <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
        <LoadingIcon /> <I18n>Loading Sentry issues</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  return (
    <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
      <ul>{issues.map(mapIssueToListItem)}</ul>
    </Container>
  );
}
