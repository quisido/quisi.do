/// <reference types="@cloudflare/workers-types" />
import { ExportedHandler as QuisidoExportedHandler } from './constants/worker.js';

export default new QuisidoExportedHandler() satisfies ExportedHandler;
