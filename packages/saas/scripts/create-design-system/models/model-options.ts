import { codex, formatCodex } from './codex.js';
import { Model } from './model.js';
import { formatOpenCode, opencode } from './opencode.js';

export interface ModelOptions {
  readonly command: readonly string[];
  /**
   * Returns a formatter, because some formatters, such as OpenCode's, buffer
   * partial stdout lines and therefore must be scoped to a single execution.
   */
  readonly format: (message: string) => string | undefined;
  readonly parallel: boolean;
}

export const MODEL_OPTIONS: Record<Model, ModelOptions> = {
  [Model.Luna]: {
    command: codex('gpt-5.6-luna'),
    format: formatCodex,
    parallel: false,
  },

  [Model.Sol]: {
    command: codex('gpt-5.6-sol'),
    format: formatCodex,
    parallel: false,
  },

  [Model.Terra]: {
    command: codex('gpt-5.6-terra'),
    format: formatCodex,
    parallel: false,
  },

  [Model.Qwen38FlashNext]: {
    command: opencode('strata/qwen3.8-flash-next-iq3_s'),
    format: formatOpenCode,
    parallel: false,
  },
};
