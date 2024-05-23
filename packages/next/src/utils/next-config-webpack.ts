import assert from 'node:assert';
import type { Configuration } from 'webpack';
import type { WebpackRule } from '../types/webpack-rule.js';
import isRuleSetRule from './is-rule-set-rule.js';

const mapRule = (rule: WebpackRule): WebpackRule => {
  if (
    !isRuleSetRule(rule) ||
    rule.loader !== 'babel-loader' ||
    typeof rule.options !== 'object'
  ) {
    return rule;
  }

  return {
    ...rule,
    options: {
      ...rule.options,
      sourceMaps: true,
    },
  };
};

export default function nextConfigWebpack(
  config: Configuration,
): Configuration {
  assert('module' in config);
  assert('rules' in config.module);

  return {
    ...config,
    devtool: 'source-map',
    module: {
      ...config.module,
      rules: config.module.rules.map(mapRule),
    },
  };
}
