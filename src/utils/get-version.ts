import mapGitHubShaToVersion from '../utils/map-github-sha-to-version';

export default function getVersion(): string {
  const githubSha: string | undefined = process.env.REACT_APP_GITHUB_SHA;
  if (typeof githubSha !== 'string') {
    return 'alpha';
  }

  return mapGitHubShaToVersion(githubSha);
}
