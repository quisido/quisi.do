declare module 'dd-trace/esbuild' {
  import type { PluginOption } from 'vite';

  const ddPlugin: PluginOption;
  export = ddPlugin;
}
