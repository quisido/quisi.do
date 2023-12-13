import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../components/section';
import withAsync from '../../../../hocs/with-async';
import type Issue from '../../../../types/sentry-issue';
import ErrorView from './components/error';
import Loading from './components/loading';
import Uninitiated from './components/uninitiated';

interface Props {
  readonly error: string | null;
  readonly initiated: boolean;
  readonly issues: readonly Issue[];
  readonly loading: boolean;
}

const mapIssueToListItem = (issue: Readonly<Issue>): ReactElement => (
  <li key={issue.id}>{issue.title}</li>
);

function SentryIssues({ issues }: Props): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      <ul>{issues.map(mapIssueToListItem)}</ul>
    </Section>
  );
}

export default withAsync(Uninitiated, Loading, ErrorView, SentryIssues);
