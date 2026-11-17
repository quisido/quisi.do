import type exportedHandler from "../src/index.js";

declare global {
  namespace Cloudflare {
    interface GlobalProps {
      "mainModule": {
        readonly "default": typeof exportedHandler;
      };
    }
  }
}
