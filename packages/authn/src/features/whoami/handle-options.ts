import StatusCode from "../../constants/status-code.js";
import getResponseHeaders from "./get-response-headers.js";

export default function handleOptions(): Response {
  return new Response(null, {
    headers: getResponseHeaders(),
    status: StatusCode.OK,
  });
}
