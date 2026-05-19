import GITHUB_REPOSITORY_URL from '../constants/github-repository-url.js';
import { GITHUB_SHA } from '../constants/github-sha.js';

const getGithubCommitUrl = (): string | undefined => {
  if (
    typeof GITHUB_REPOSITORY_URL === 'undefined' ||
    typeof GITHUB_SHA === 'undefined'
  ) {
    return;
  }

  return `${GITHUB_REPOSITORY_URL}commit/${GITHUB_SHA}`;
};

const GITHUB_COMMIT_URL: string | undefined = getGithubCommitUrl();

export default GITHUB_COMMIT_URL;
