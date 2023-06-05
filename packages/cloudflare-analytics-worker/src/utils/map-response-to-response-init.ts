export default function mapResponseToResponseInit(
  response: Response,
): ResponseInit {
  return {
    cf: response.cf,
    // encodeBody,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    webSocket: response.webSocket,
  };
}
