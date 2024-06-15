import { StatusCode } from "../constants/status-code.js";
import Response from '../utils/response.js';

interface Options {
  readonly console: Console;
  readonly db: D1Database;
  readonly key: string | null;
  readonly projectId: number;
  readonly usage: AnalyticsEngineDataset;
}

export default function handleGet({
  console,
  key,
}: Options): Response {
  if (key === null) {
    console.log('Missing key');
    return new Response(StatusCode.BadRequest);
  }

  return new Response(StatusCode.OK);
}
