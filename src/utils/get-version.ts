import getDefaultVersion from '../utils/get-default-version';
import leftPad from '../utils/left-pad';

export default function getVersion(): string {
  // Production environments
  const version: string | undefined = process.env.REACT_APP_VERSION;
  if (typeof version === 'string') {
    return version;
  }

  // Test environments
  const defaultVersion: string = getDefaultVersion();
  if (process.env.CI === 'true') {
    return `${defaultVersion}-test`;
  }

  // Development environments
  const DATE: Date = new Date();
  const SECONDS: string = leftPad(DATE.getSeconds());
  return `${defaultVersion}-alpha-${SECONDS}`;
}
