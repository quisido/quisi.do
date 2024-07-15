import { RequiredVariable } from '@quisido/workers-shared';
import AuthnState from '../features/authn-state.js';

export const STATE_VAR = new RequiredVariable<AuthnState>({
  name: 'state',
});
