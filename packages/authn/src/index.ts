/// <reference types="@cloudflare/workers-types" />
import { WORKER } from './constants/worker.js';

export default WORKER.createExportedHandler({
  console,
  fetch,
}) satisfies ExportedHandler;
