/// <reference types="@cloudflare/workers-types" />
import { ExportedHandler } from '@quisido/worker';
import AuthnFetchHandler from './features/authn-fetch-handler.js';

export default new ExportedHandler({
  FetchHandler: AuthnFetchHandler,
  console,
  fetch,
});
