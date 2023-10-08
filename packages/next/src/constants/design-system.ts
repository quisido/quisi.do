import createEnumUtils from '../utils/create-enum-utils';

enum DesignSystem {
  Awsui = 'awsui',
  CloudscapeDesign = 'cloudscape-design',
  Mui = 'mui',
}

export default DesignSystem;

const { isType } = createEnumUtils(DesignSystem);
export const isDesignSystem = isType;
