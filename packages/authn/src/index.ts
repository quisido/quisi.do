/// <reference types="@cloudflare/workers-types" />
import handleFetch from './features/handle-fetch.js';

export default {
  fetch: handleFetch.bind(null, fetch),
} satisfies ExportedHandler;
