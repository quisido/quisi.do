import createEnumUtils from '../utils/create-enum-utils';

enum DesignSystem {
  Quisi = 'quisi',
}

export default DesignSystem;

const { isType } = createEnumUtils(DesignSystem, 'a design system');
export const isDesignSystem = isType;
