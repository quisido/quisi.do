/// <reference types="@cloudflare/workers-types" />
import { createExportedHandler } from './constants/worker.js';

export default createExportedHandler({
  console,
  fetch,
}) satisfies ExportedHandler;
