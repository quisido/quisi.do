import { afterEach, beforeEach } from 'vitest';
import { mockConsoleLog, restoreConsoleLog } from './mock-console-log.js';

beforeEach(mockConsoleLog);
afterEach(restoreConsoleLog);
