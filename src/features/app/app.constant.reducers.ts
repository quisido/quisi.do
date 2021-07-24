import type { PayloadAction } from '@reduxjs/toolkit';
import type Language from '../../constants/language';
import type AppState from './app.type.state';

const APP_REDUCERS = {
  setDarkMode: (
    state: AppState,
    action: Readonly<PayloadAction<boolean>>,
  ): AppState => ({
    ...state,
    isDarkModeEnabled: action.payload,
  }),

  setLanguage: (
    state: AppState,
    action: Readonly<PayloadAction<Language>>,
  ): AppState => ({
    ...state,
    language: action.payload,
  }),
};

export default APP_REDUCERS;
