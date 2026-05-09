import type { DesignSystem } from '../core/index.js';

export default async function importTestedDesignSystem(): Promise<DesignSystem> {
  const { DESIGN_SYSTEM } = process.env;

  if (DESIGN_SYSTEM === undefined) {
    throw new Error('Expected a DESIGN_SYSTEM environment variable.');
  }

  switch (DESIGN_SYSTEM) {
    case 'template': {
      return await import('../template/index.js');
    }

    default:
      throw new Error(`Unknown design system: ${DESIGN_SYSTEM}`);
  }
}
