import mapGitHubShaToVersion from '../utils/map-github-sha-to-version';

export default function getVersion(): string {
  /**
   *   If this build relates to a specific GitHub SHA, then the SHA should be
   * used to generate the version ID.
   */
  const githubSha: string | undefined = process.env.GITHUB_SHA;
  if (typeof githubSha === 'string') {
    return mapGitHubShaToVersion(githubSha);
  }

  const { NODE_ENV } = process.env;

  /**
   *   If we're performing a production build in a non-production environment,
   * then we call it the gamma build.
   */
  if (NODE_ENV === 'production') {
    return 'gamma';
  }

  /**
   *   If we're in development mode, then we call it the alpha build. `NODE_ENV`
   * is `undefined` in the client instance of a NextJS application.
   */
  if (NODE_ENV === 'development' || typeof NODE_ENV === 'undefined') {
    return 'alpha';
  }

  return 'beta';
}
