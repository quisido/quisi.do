export default function mapApiTokenToHeaders(token: string): Headers {
  return new Headers({
    Authorization: `Bearer ${token}`,
  });
}
