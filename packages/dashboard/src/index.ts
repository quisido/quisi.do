/// <reference types="@cloudflare/workers-types" />
import fetch from './features/fetch.js';
import scheduled from './features/scheduled.js';

export default {
  fetch,
  scheduled,
} satisfies ExportedHandler;
