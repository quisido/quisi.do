import GitHubEventName from '../constants/github-event-name-enum';
import GITHUB_EVENT_NAME from '../constants/github-event-name-env';
import getDefaultVersion from '../utils/get-default-version';

export default function getVersion(): string {
  // Live production environment
  const version: string | undefined = process.env.REACT_APP_VERSION;
  if (typeof version === 'string') {
    return version;
  }

  const defaultVersion: string = getDefaultVersion();

  if (process.env.NODE_ENV === 'production') {
    // Build production environment
    if (GITHUB_EVENT_NAME === GitHubEventName.Push) {
      return defaultVersion;
    }

    // Manual test environments (e.g. pull requests)
    return `${defaultVersion}-beta`;
  }

  // Automated test environments, e.g. Cypress
  if (process.env.CI === 'true') {
    return `${defaultVersion}-test`;
  }

  // Development environments, e.g. `yarn start`
  return `${defaultVersion}-alpha`;
}
