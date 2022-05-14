import {createAction} from '@reduxjs/toolkit';
import {Guitar} from '../types/guitar';

const loadGuitars = createAction<Guitar[]>('data/loadGuitars');

export {loadGuitars};
