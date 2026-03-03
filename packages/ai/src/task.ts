/// <reference types="../worker-configuration.d.ts" />
import type { Model } from './model.js';

export default interface Task {
  readonly data: string;
  readonly dataType: 'json';
  readonly goal: string;
  readonly model: Model;
  readonly tools: readonly AiTextGenerationToolLegacyInput[];
}
