import mapGitHubShaToVersion from '../utils/map-github-sha-to-version';

export default function getVersion(): string {
  // If this build relates to a specific GitHub SHA, then the SHA should be used
  //   to generate the version ID.
  const githubSha: string | undefined = process.env.REACT_APP_GITHUB_SHA;
  if (typeof githubSha === 'string') {
    return mapGitHubShaToVersion(githubSha);
  }

  const { NODE_ENV } = process.env;

  // If we're performing a production build in a non-production environment,
  //   then we call it the gamma build.
  if (NODE_ENV === 'production') {
    return 'gamma';
  }

  // If we're in development mode, then we call it the alpha build.
  if (NODE_ENV === 'development') {
    return 'alpha';
  }

  return 'beta';
}
