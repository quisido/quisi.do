import GITHUB_REPOSITORY from '../constants/github-repository';

const getGithubRepositoryUrl = (): string | undefined => {
  if (typeof GITHUB_REPOSITORY === 'undefined') {
    return;
  }

  return `https://github.com/${GITHUB_REPOSITORY}/`;
};

const GITHUB_REPOSITORY_URL: string | undefined = getGithubRepositoryUrl();

export default GITHUB_REPOSITORY_URL;
