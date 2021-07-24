import type { History } from 'history';
import { createBrowserHistory } from 'history';

const HISTORY: History<unknown> = createBrowserHistory();

export default HISTORY;
