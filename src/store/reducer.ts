import {createReducer} from '@reduxjs/toolkit';
import {getGuitars} from './action';

const initialState = {
  guitars: [],
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getGuitars, (state) => {
      state.guitars = [];
    })
})

export {reducer};
