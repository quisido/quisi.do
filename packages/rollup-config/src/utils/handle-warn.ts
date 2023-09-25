import type { LoggingFunction, RollupLog } from 'rollup';
import isModuleLevelDirectiveWarning from './is-module-level-directive-warning.js';

export default function handleWarn(
  warning: RollupLog,
  warn: LoggingFunction,
): void {
  if (isModuleLevelDirectiveWarning(warning)) {
    return;
  }

  warn(warning);
}
