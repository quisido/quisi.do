import Worker from '@quisido/worker';
import { WORKER_OPTIONS } from './worker-options.js';

export const WORKER = new Worker(WORKER_OPTIONS);
