import GITHUB_REPOSITORY from '../constants/github-repository';
import GITHUB_SERVER_URL from '../constants/github-server-url';

const getGithubRepositoryUrl = (): string | undefined => {
  if (typeof GITHUB_REPOSITORY === 'undefined') {
    return;
  }

  return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/`;
};

const GITHUB_REPOSITORY_URL: string | undefined = getGithubRepositoryUrl();

export default GITHUB_REPOSITORY_URL;
