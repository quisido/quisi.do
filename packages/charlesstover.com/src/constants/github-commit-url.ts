import GITHUB_REPOSITORY_URL from '../constants/github-repository-url';
import GITHUB_SHA from '../constants/github-sha';
import findUndefined from '../utils/find-undefined';

const getGithubCommitUrl = (): string | undefined => {
  if (findUndefined(GITHUB_REPOSITORY_URL) || findUndefined(GITHUB_SHA)) {
    return;
  }

  return `${GITHUB_REPOSITORY_URL}commit/${GITHUB_SHA}`;
};

const GITHUB_COMMIT_URL: string | undefined = getGithubCommitUrl();

export default GITHUB_COMMIT_URL;
