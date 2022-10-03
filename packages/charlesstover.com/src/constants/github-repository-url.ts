import GITHUB_REPOSITORY from '../constants/github-repository';
import filterByUndefined from '../utils/filter-by-undefined';

const getGithubRepositoryUrl = (): string | undefined => {
  if (filterByUndefined(GITHUB_REPOSITORY)) {
    return;
  }

  return `https://github.com/${GITHUB_REPOSITORY}/`;
};

const GITHUB_REPOSITORY_URL: string | undefined = getGithubRepositoryUrl();

export default GITHUB_REPOSITORY_URL;
