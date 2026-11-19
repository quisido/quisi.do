export default async function fetch (
  request: Readonly<Request> | string,
  options: Readonly<RequestInit> = {},
): Promise<Readonly<Response>> {

  return globalThis.fetch(request, options);

}
