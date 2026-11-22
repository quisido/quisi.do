import type { ReadonlyDeep } from "@lib/readonly-deep.js";

const TRANSPARENT_ICO_BODY: string =
  "%00%00%01%00%01%00%01%01%00%00%01%00%20%000%00%00%00%16%00%00%00(%00%00%00%01%00%00%00%02%00%00%00%01%00%20%00%00%00%00%00%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00";

export default function getFaviconIcoResponse(): ReadonlyDeep<Response> {
  return new Response(TRANSPARENT_ICO_BODY, {
    "headers": {
      "access-control-max-age": "31536000",
      "cache-control": "immutable, max-age=31536000, public",
      "content-type": "image/vnd.microsoft.icon",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
    },
  });
}
