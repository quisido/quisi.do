import getDefaultVersion from '../utils/get-default-version';
import leftPad from '../utils/left-pad';

const getVersion = (): string => {
  const version: string | undefined = process.env.REACT_APP_VERSION;
  if (typeof version === 'string') {
    return version;
  }

  const DATE: Date = new Date();
  const SECONDS: string = leftPad(DATE.getSeconds());
  return `${getDefaultVersion()}-alpha-${SECONDS}`;
};

const VERSION: string = getVersion();

export default VERSION;
