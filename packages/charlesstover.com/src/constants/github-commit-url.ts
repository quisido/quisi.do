import GITHUB_REPOSITORY_URL from '../constants/github-repository-url';
import GITHUB_SHA from '../constants/github-sha';
import isUndefined from '../utils/is-undefined';

const getGithubCommitUrl = (): string | undefined => {
  if (isUndefined(GITHUB_REPOSITORY_URL) || isUndefined(GITHUB_SHA)) {
    return;
  }

  return `${GITHUB_REPOSITORY_URL}commit/${GITHUB_SHA}`;
};

const GITHUB_COMMIT_URL: string | undefined = getGithubCommitUrl();

export default GITHUB_COMMIT_URL;
