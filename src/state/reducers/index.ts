import { combineReducers } from 'redux';
import app from './app';

export const reducer = combineReducers({
  app,
});

export type RState = ReturnType<typeof reducer>;
