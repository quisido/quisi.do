import { MILLISECONDS_PER_SECOND } from '../constants/time.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

export default function nowSeconds(this: AuthnFetchHandler): number {
  return Math.floor(this.now() / MILLISECONDS_PER_SECOND);
}
