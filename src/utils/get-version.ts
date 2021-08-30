import getDefaultVersion from '../utils/get-default-version';

export default function getVersion(): string {
  // Production environment
  const version: string | undefined = process.env.REACT_APP_VERSION;
  if (typeof version === 'string') {
    return version;
  }

  // Development environments, e.g. `yarn start`
  const defaultVersion: string = getDefaultVersion();
  return `${defaultVersion}-alpha`;
}
