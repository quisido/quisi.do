import { createRequire } from 'node:module';

const REQUIRE: NodeJS.Require = createRequire(import.meta.url);

export default function requireResolve(path: string): string {
  return REQUIRE.resolve(path);
}
