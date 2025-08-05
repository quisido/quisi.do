/**
 *   `@quisido/eslint-config` depends on `@quisido/vitest-config` and vice
 * versa. To prevent a circular dependency, we import directly from their build
 * directories.
 */
export { default } from '../eslint-config/src/index.js';
