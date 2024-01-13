import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../components/section.js';
import withAsync from '../../../../hocs/with-async.js';
import type Issue from '../../../../types/sentry-issue.js';
import ErrorView from './components/error.js';
import Loading from './components/loading.js';
import Uninitiated from './components/uninitiated.js';

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
