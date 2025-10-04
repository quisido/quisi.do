export default function mapRequestInfoToString(input: RequestInfo): string {
  if (input instanceof Request) {
    return input.url;
  }

  return input;
}
