import {createReducer} from '@reduxjs/toolkit';
import {
  loadGuitars,
  loadCurrentGuitar,
  setGuitarLoadingNeeded,
  loadComments,
  setAddToCartModalOpened,
  setAddReviewModalOpened,
  setReviewSuccessOpened,
  setGuitarLoading,
  setCommentsListLoading,
  addNewComment,
  setAllModalsClosed
} from './actions';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

type StateType = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  currentGuitar: Guitar,
  isGuitarLoading: boolean,
  isGuitarLoaded: boolean,
  comments: Comment[],
  isCommentsListLoading: boolean,
  isCommentsListLoaded: boolean,
  isAddToCartModalOpened: boolean,
  isAddReviewModalOpened: boolean,
  isReviewSuccessOpened: boolean,
}

const initialState: StateType = {
  guitars: [],
  isDataLoaded: false,
  currentGuitar: {} as Guitar,
  isGuitarLoading: false,
  isGuitarLoaded: false,
  comments: [],
  isCommentsListLoading: false,
  isCommentsListLoaded: false,
  isAddToCartModalOpened: false,
  isAddReviewModalOpened: false,
  isReviewSuccessOpened: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      state.currentGuitar = action.payload;
      state.isGuitarLoading = false;
      state.isGuitarLoaded = true;
    })
    .addCase(setGuitarLoadingNeeded, (state) => {
      state.isGuitarLoaded = false;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
      state.isCommentsListLoading = false;
      state.isCommentsListLoaded = true;
    })
    .addCase(setAddToCartModalOpened, (state, action) => {
      state.isAddToCartModalOpened = action.payload;
    })
    .addCase(setAddReviewModalOpened, (state, action) => {
      state.isAddReviewModalOpened = action.payload;
    })
    .addCase(setReviewSuccessOpened, (state, action) => {
      state.isReviewSuccessOpened = action.payload;
    })
    .addCase(setGuitarLoading, (state, action) => {
      state.isGuitarLoading = action.payload;
    })
    .addCase(setCommentsListLoading, (state, action) => {
      state.isCommentsListLoading = action.payload;
    })
    .addCase(addNewComment, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(setAllModalsClosed, (state) => {
      state.isAddToCartModalOpened = false;
      state.isAddReviewModalOpened = false;
      state.isReviewSuccessOpened = false;
    });
});

export {reducer};
