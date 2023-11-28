export default async function fetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
): Promise<Response> {
  return window.fetch(input, init);
}
