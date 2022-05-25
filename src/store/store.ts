import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './root-reducer';
import {createAPI} from '../service/api';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
});

export {api, store};
