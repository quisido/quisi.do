import type { DesignSystem } from '../core/index.js';

export default async function importTestedDesignSystem(): Promise<DesignSystem> {
  const { VITE_TESTED_DESIGN_SYSTEM } = import.meta.env;

  if (VITE_TESTED_DESIGN_SYSTEM === undefined) {
    throw new Error(
      'Expected a VITE_TESTED_DESIGN_SYSTEM environment variable.',
    );
  }

  switch (VITE_TESTED_DESIGN_SYSTEM) {
    case 'template': {
      return await import('../template/index.js');
    }

    default:
      throw new Error(`Unknown design system: ${VITE_TESTED_DESIGN_SYSTEM}`);
  }
}
