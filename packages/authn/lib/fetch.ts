export default async function fetch (
  request: Readonly<Request> | string,
  options: Readonly<RequestInit> = {},
): Promise<Readonly<Response>> {

  /**
   * TODO:
   * - allowlist of hosts
   * - deny secrets in body, headers, etc.
   */
  return globalThis.fetch(request, options);

}
