import { type MonogatariSettings, type StoryLabel } from './types.js';

const START_LABEL: StoryLabel = 'Start';

export const SETTINGS: MonogatariSettings = {
  AllowRollback: true,
  AssetsPath: {
    characters: 'characters',
    root: 'assets',
    scenes: 'scenes',
  },
  AutoSave: 0,
  CenteredTypeAnimation: true,
  ExperimentalFeatures: false,
  ForceAspectRatio: 'None',
  Label: START_LABEL,
  LanguageSelectionScreen: false,
  MultiLanguage: false,
  NarratorTypeAnimation: true,
  NVLTypeAnimation: true,
  Orientation: 'any',
  Preload: true,
  ServiceWorkers: false,
  ShowMainScreen: true,
  Skip: 32,
  SplashScreenLabel: '',
  TypeAnimation: true,
};
