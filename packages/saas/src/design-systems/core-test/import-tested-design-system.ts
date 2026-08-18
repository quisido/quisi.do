import type { DesignSystem } from '../core/index.js';

export default async function importTestedDesignSystem(): Promise<DesignSystem> {
  const { VITE_TESTED_DESIGN_SYSTEM } = import.meta.env;

  if (VITE_TESTED_DESIGN_SYSTEM === undefined) {
    throw new Error(
      'Expected a VITE_TESTED_DESIGN_SYSTEM environment variable.',
    );
  }

  if (
    VITE_TESTED_DESIGN_SYSTEM.includes('.') ||
    VITE_TESTED_DESIGN_SYSTEM.includes('/') ||
    VITE_TESTED_DESIGN_SYSTEM.includes('\\')
  ) {
    throw new Error('Invalid VITE_TESTED_DESIGN_SYSTEM environment variable.', {
      cause: VITE_TESTED_DESIGN_SYSTEM,
    });
  }

  return (await import(
    `../${VITE_TESTED_DESIGN_SYSTEM}/index.js`
  )) as DesignSystem;
}
