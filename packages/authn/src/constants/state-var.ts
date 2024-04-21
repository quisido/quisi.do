import type State from '../features/state.js';
import RequiredVariable from '../utils/required-variable.js';

const stateVar: RequiredVariable<State> = new RequiredVariable<State>({
  name: 'state',
});

export default stateVar;
