import GITHUB_REPOSITORY from '../constants/github-repository';
import isUndefined from '../utils/is-undefined';

const getGithubRepositoryUrl = (): string | undefined => {
  if (isUndefined(GITHUB_REPOSITORY)) {
    return;
  }

  return `https://github.com/${GITHUB_REPOSITORY}/`;
};

const GITHUB_REPOSITORY_URL: string | undefined = getGithubRepositoryUrl();

export default GITHUB_REPOSITORY_URL;
