import getDefaultVersion from '../utils/get-default-version';

export default function getVersion(): string {
  // Production environments
  const version: string | undefined = process.env.REACT_APP_VERSION;
  if (typeof version === 'string') {
    return version;
  }

  const defaultVersion: string = getDefaultVersion();

  // Manual test environments
  // If we were deploying to production, we would have set a version.
  // Since we are building for production and the version is not set, we must be
  //   deploying to a beta environment.
  if (process.env.NODE_ENV === 'production') {
    return `${defaultVersion}-beta`;
  }

  // Automated test environments, e.g. Cypress
  if (process.env.CI === 'true') {
    return `${defaultVersion}-test`;
  }

  // Development environments, e.g. `yarn start`
  return `${defaultVersion}-alpha`;
}
