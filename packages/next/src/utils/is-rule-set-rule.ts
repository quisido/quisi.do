import type { RuleSetRule } from 'webpack';
import type { WebpackRule } from '../types/webpack-rule.js';

export default function isRuleSetRule(rule: WebpackRule): rule is RuleSetRule {
  return typeof rule === 'object' || rule !== null;
}
