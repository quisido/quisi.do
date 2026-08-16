export interface ModelOptions {
  readonly parallel: boolean;
}

export enum Model {
  Codex = 'codex',
}

export const MODEL_OPTIONS: Record<Model, ModelOptions> = {
  [Model.Codex]: {
    parallel: false,
  },
};

export const isModelSlug = (value: string): value is Model =>
  Object.hasOwn(MODEL_OPTIONS, value);
