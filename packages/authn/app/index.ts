import { exports as worker } from "cloudflare:workers";

export async function fetch (...params: Parameters<Fetcher["fetch"]>): Promise<Response> {

  return await worker.default.fetch(...params);

}
