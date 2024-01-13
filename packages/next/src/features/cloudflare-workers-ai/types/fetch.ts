import type ModelState from './model-state.js';

type Fetch = (auth: string, state: ModelState) => Promise<unknown>;

export default Fetch;
