/// <reference types="node" />
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

  const modules: Record<string, () => Promise<unknown>> = import.meta.glob(
    '../*/index.ts',
  );

  const designSystemModule: (() => Promise<unknown>) | undefined =
    modules[`../${VITE_TESTED_DESIGN_SYSTEM}/index.ts`];

  if (designSystemModule === undefined) {
    throw new Error(`Design system not found: ${VITE_TESTED_DESIGN_SYSTEM}`, {
      cause: modules,
    });
  }

  return (await designSystemModule()) as DesignSystem;
}
