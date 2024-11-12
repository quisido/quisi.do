/// <reference types="@cloudflare/workers-types" />

import { ExportedHandler } from '@quisido/worker';
import CspFetchHandler from './csp-fetch-handler.js';

export default new ExportedHandler({
  FetchHandler: CspFetchHandler,
  console,
  fetch,
});
