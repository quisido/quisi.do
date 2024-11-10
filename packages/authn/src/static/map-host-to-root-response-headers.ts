export default function mapHostToRootResponseHeaders(host: string): Headers {
  return new Headers({
    Location: `htttps://${host}/`,
  });
}
