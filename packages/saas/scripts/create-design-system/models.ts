export enum Model {
  Luna = 'luna',
  Sol = 'sol',
  Terra = 'terra',
}

type ModelCommand = (options: ModelCommandOptions) => readonly string[];

export interface ModelCommandOptions {
  readonly directory: string;
  readonly prompt: string;
}

export interface ModelOptions {
  readonly command: ModelCommand;
  readonly parallel: boolean;
}

const codex =
  (model: string): ModelCommand =>
  ({ directory, prompt }: ModelCommandOptions): readonly string[] => [
    'codex',
    'exec',
    '--approve-for-me',
    '--ask-for-approval',
    'never',
    '--cd',
    directory,
    '--color',
    'always',
    '--config',
    `model="${model}"`,
    '--ephemeral',
    '--sandbox',
    'workspace-write',
    '--search',
    '--strict-config',
    prompt,
  ];

export const MODEL_OPTIONS: Record<Model, ModelOptions> = {
  [Model.Luna]: {
    command: codex('gpt-5.6-luna'),
    parallel: false,
  },
  [Model.Sol]: {
    command: codex('gpt-5.6-sol'),
    parallel: false,
  },
  [Model.Terra]: {
    command: codex('gpt-5.6-terra'),
    parallel: false,
  },
};

export const isModel = (value: string): value is Model =>
  Object.hasOwn(MODEL_OPTIONS, value);
