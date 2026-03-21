import { type Config } from 'stylelint';

const CONFIG: Config = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'blockless-after-blockless',
          'blockless-after-same-name-blockless',
          'first-nested',
        ],
      },
    ],

    'font-family-no-missing-generic-family-keyword': [
      true,
      { ignoreFontFamilies: 'Noto Color Emoji' },
    ],

    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        disableFix: false,
        except: ['first-nested', 'after-comment', 'after-dollar-variable'],
      },
    ],
  },
};

export default CONFIG;
