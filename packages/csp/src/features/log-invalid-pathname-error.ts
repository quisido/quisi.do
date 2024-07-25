import { logPublicError } from '../constants/worker.js';

export default function logInvalidPathnameError(pathname: string): void {
  logPublicError(new Error('Invalid pathname', { cause: pathname }));
}
