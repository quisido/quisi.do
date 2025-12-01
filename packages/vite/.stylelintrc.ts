import { type Config } from 'stylelint';

const CONFIG: Config = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: 'Noto Color Emoji' },
    ],
  },
};

export default CONFIG;
