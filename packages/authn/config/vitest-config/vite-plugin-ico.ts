import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";

export const vitePluginIco = (): Plugin => ({
  "name": "vite-plugin-ico",
  "transform": async (_code: string, id: string): Promise<string | undefined> => {

    if (!id.endsWith(".ico")) {

      return;

    }

    const buffer: Buffer<ArrayBuffer> = await readFile(id);

    return `export default new Uint8Array([${buffer.join(",")}]).buffer;`;

  },
});
