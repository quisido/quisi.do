import type exportedHandler from "../src/index.js";

declare global {
  namespace Cloudflare {
    interface GlobalProps {
      "mainModule": Readonly<{
        "default": typeof exportedHandler;
      }>;
    }
  }
}
