/// <reference types="@cloudflare/workers-types" />
import { ExportedHandler } from './constants/worker.js';

export default new ExportedHandler({
  console,
  fetch,
});
