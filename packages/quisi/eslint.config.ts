import config from '@quisido/eslint-config';
import type { Config } from 'eslint/config';

const CONFIG: Config[] = [
  ...config,

  {
    rules: {
      'max-statements': 'warn',
    },
  },
];

export default CONFIG;
