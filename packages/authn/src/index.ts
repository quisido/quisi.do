/// <reference types="@cloudflare/workers-types" />
import fetch from './features/fetch.js';

export default {
  fetch,
} satisfies ExportedHandler;
