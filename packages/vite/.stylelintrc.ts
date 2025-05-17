import { type Config } from 'stylelint';

export default {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: 'Noto Color Emoji' },
    ],
  },
} satisfies Config;
