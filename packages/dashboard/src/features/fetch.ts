/// <reference types="@cloudflare/workers-types" />

export default (async function fetch(
  request: Readonly<Request>,
  env: unknown,
): Promise<Response> {
  console.log(request, env);
  return new Response();
} satisfies ExportedHandlerFetchHandler);
