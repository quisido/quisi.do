export default function mapResponseToResponseInit(
  response: Response,
): ResponseInit {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    cf: response.cf,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    webSocket: response.webSocket,
  };
}
