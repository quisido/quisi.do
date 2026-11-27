import { defineCloudflareOptions } from "@sentry/cloudflare";
import type { CloudflareOptions } from "@sentry/cloudflare";
import type { ReadonlyDeep } from "./readonly-deep.js";

type OptionsFn = (env: ReadonlyDeep<Env>) =>
  ReadonlyDeep<CloudflareOptions> | undefined;

/** @see https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate */
const OPTIONS: OptionsFn =
  defineCloudflareOptions(
    (env: ReadonlyDeep<Env>): CloudflareOptions => ({
      "dataCollection": {
        "cookies": {
          "deny": ["__Secure-Authentication-ID", "__Secure-Session-ID"],
        },
      },
      "dsn": "https://cbf35b377ced590510b13dec4ec3a0d5@o592283.ingest.us.sentry.io/4512484768153600",
      "environment": env.ENVIRONMENT_NAME,
      "release": env.VERSION,
      "tracesSampleRate": 1.0,
    }),
  );

export default OPTIONS;
