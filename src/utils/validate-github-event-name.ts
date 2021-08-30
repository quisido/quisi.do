import GitHubEventName from '../constants/github-event-name-enum';

const GITHUB_EVENT_NAMES: Set<GitHubEventName> = new Set(
  Object.values(GitHubEventName),
);

export default function filterByGitHubEventName(
  value: unknown,
): value is GitHubEventName {
  // TypeScript erroneously requires `Set.prototype.has` only receive types in
  //   that set.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return GITHUB_EVENT_NAMES.has(value as GitHubEventName);
}
