import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../service/api';

const api = createAPI();

const store = configureStore({reducer});

export {api, store};
