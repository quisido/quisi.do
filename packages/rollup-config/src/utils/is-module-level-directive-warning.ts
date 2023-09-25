import type { RollupLog } from 'rollup';
import isModuleLevelDirectiveWarningMessage from './is-module-level-directive-warning-message.js';

export default function isModuleLevelDirectiveWarning({
  code,
  message,
}: RollupLog): boolean {
  switch (code) {
    case 'MODULE_LEVEL_DIRECTIVE':
      return isModuleLevelDirectiveWarningMessage(message);
    default:
      return false;
  }
}
