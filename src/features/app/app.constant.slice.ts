import { createSlice } from '@reduxjs/toolkit';
import REDUCERS from './app.constant.reducers';
import INITIAL_STATE from './app.constant.initial-state';

const APP_SLICE = createSlice({
  initialState: INITIAL_STATE,
  name: 'app',
  reducers: REDUCERS,
});

export default APP_SLICE;

export const { setDarkMode, setLanguage } = APP_SLICE.actions;
