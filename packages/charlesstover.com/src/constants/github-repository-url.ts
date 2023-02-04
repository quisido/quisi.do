import GITHUB_REPOSITORY from '../constants/github-repository';
import findUndefined from '../utils/find-undefined';

const getGithubRepositoryUrl = (): string | undefined => {
  if (findUndefined(GITHUB_REPOSITORY)) {
    return;
  }

  return `https://github.com/${GITHUB_REPOSITORY}/`;
};

const GITHUB_REPOSITORY_URL: string | undefined = getGithubRepositoryUrl();

export default GITHUB_REPOSITORY_URL;
