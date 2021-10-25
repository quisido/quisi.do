import { createSlice } from '@reduxjs/toolkit';
import REDUCERS from '../constants/app-reducers';
import INITIAL_STATE from '../constants/initial-app-state';

const APP_SLICE = createSlice({
  initialState: INITIAL_STATE,
  name: 'app',
  reducers: REDUCERS,
});

export default APP_SLICE;

export const { setDarkMode, setDesignSystem, setLanguage } = APP_SLICE.actions;
