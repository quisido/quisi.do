import { cloudflare } from "@cloudflare/vite-plugin";
import { sentryCloudflareVitePlugin } from "@sentry/cloudflare/vite";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";

const CONFIG: UserConfig = defineConfig({
  "plugins": [cloudflare(), sentryCloudflareVitePlugin()],
});

export default CONFIG;
