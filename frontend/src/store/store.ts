import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog/catalogSlice';

export const store = configureStore({
  reducer: {
    catalogs: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
