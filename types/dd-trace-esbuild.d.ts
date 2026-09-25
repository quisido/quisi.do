import { type PluginOption } from 'vite';

declare module 'dd-trace/esbuild' {
  const ddPlugin: PluginOption;
  export default ddPlugin;
}
