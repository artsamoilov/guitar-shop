import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars} from './actions';
import {Guitar} from '../types/guitar';

type StateType = {
  guitars: Guitar[],
  isDataLoaded: boolean,
}

const initialState: StateType = {
  guitars: [],
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    });
});

export {reducer};
