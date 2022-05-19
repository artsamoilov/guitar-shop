import {createReducer} from '@reduxjs/toolkit';
import {loadGuitars, loadCurrentGuitar, setGuitarLoadingNeeded, loadComments, setAddToCartModalOpened} from './actions';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

type StateType = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  currentGuitar: Guitar,
  isGuitarLoaded: boolean,
  comments: Comment[],
  isAddToCartModalOpened: boolean,
}

const initialState: StateType = {
  guitars: [],
  isDataLoaded: false,
  currentGuitar: {} as Guitar,
  isGuitarLoaded: false,
  comments: [],
  isAddToCartModalOpened: false,
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
    })
    .addCase(setAddToCartModalOpened, (state, action) => {
      state.isAddToCartModalOpened = action.payload;
    });
});

export {reducer};
