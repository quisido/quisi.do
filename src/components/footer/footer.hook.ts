import GITHUB_COMMIT_URL from '../../constants/github-commit-url';
import GITHUB_REPOSITORY_URL from '../../constants/github-repository-url';

interface State {
  readonly versionHref?: string;
}

export default function useFooter(): State {
  return {
    versionHref: GITHUB_COMMIT_URL ?? GITHUB_REPOSITORY_URL,
  };
}
