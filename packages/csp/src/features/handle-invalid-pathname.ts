import InvalidPathnameResponse from '../utils/invalid-pathname-response.js';
import logInvalidPathnameError from './log-invalid-pathname-error.js';

export default function handleInvalidPathname(pathname: string): Response {
  logInvalidPathnameError(pathname);
  return new InvalidPathnameResponse();
}
