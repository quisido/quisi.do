/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { PayloadAction } from '@reduxjs/toolkit';
import type Language from '../../constants/language';
import type Mutable from '../../types/mutable';
import type AppState from './app.type.state';

const APP_REDUCERS = {
  setDarkMode: (
    state: Mutable<AppState>,
    action: Readonly<PayloadAction<boolean>>,
  ): void => {
    state.isDarkModeEnabled = action.payload;
  },

  setLanguage: (
    state: Mutable<AppState>,
    action: Readonly<PayloadAction<Language>>,
  ): void => {
    state.language = action.payload;
  },
};

export default APP_REDUCERS;
