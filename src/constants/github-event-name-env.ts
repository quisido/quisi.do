import type GitHubEventName from '../constants/github-event-name-enum';
import filterByGitHubEventName from '../utils/filter-by-github-event-name';

const GITHUB_EVENT_NAME: GitHubEventName | undefined = ((
  value: string | undefined,
): GitHubEventName | undefined => {
  if (!filterByGitHubEventName(value)) {
    return;
  }
  return value;
})(process.env.REACT_APP_GITHUB_EVENT_NAME);

export default GITHUB_EVENT_NAME;
