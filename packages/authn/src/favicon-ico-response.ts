import type { ReadonlyDeep } from "#lib/readonly-deep.js";
import { FAVICON } from "#lib/favicon.js";

export default function getFaviconIcoResponse(): ReadonlyDeep<Response> {
  return new Response(FAVICON, {
    "headers": {
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-type": "image/vnd.microsoft.icon",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
    },
  });
}
