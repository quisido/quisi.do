import RollupConfig from '@monorepo-template/rollup-config/new';

export default new RollupConfig()
  .addInput('index', './src/index.ts')
  .addInput('jest', './src/jest.ts')
  .setTSConfigPath('./tsconfig.rollup.json')
  .toJSON();
