import { configureStore } from '@reduxjs/toolkit';
import APP_SLICE from '../features/app/constants/app-slice';

export default configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    app: APP_SLICE.reducer,
  },
});
