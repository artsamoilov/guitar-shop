import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars} from './actions';
import {Guitar} from '../types/guitar';

type StateType = {
  guitars: Guitar[],
}

const initialState: StateType = {
  guitars: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export {reducer};
