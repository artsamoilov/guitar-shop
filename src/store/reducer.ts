import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars, loadCurrentGuitar, setGuitarLoadingNeeded, loadComments} from './actions';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

type StateType = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  currentGuitar: Guitar,
  isGuitarLoaded: boolean,
  comments: Comment[],
}

const initialState: StateType = {
  guitars: [],
  isDataLoaded: false,
  currentGuitar: {} as Guitar,
  isGuitarLoaded: false,
  comments: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
      state.isGuitarLoaded = true;
    })
    .addCase(setGuitarLoadingNeeded, (state) => {
      state.isGuitarLoaded = false;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
});

export {reducer};
