import getState from '../utils/get-state.js';
import type AuthnState from './authn-state.js';

export default function setReturnHref(): void {
  const state: AuthnState = getState();
  state.setReturnHref();
}
