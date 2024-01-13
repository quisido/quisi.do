import createEnumUtils from '../utils/create-enum-utils.js';

enum DesignSystem {
  Mui = 'mui',
  Quisi = 'quisi',
}

export default DesignSystem;

const { isType } = createEnumUtils(DesignSystem, 'a design system');
export const isDesignSystem = isType;
