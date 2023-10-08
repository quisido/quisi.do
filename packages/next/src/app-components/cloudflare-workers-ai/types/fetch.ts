import type ModelState from './model-state';

type Fetch = (auth: string, state: ModelState) => Promise<unknown>;

export default Fetch;
