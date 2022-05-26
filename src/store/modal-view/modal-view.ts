import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ModalView} from '../../types/state';

const initialState: ModalView = {
  isAddToCartModalOpened: false,
  isAddReviewModalOpened: false,
  isReviewSuccessOpened: false,
};

export const modalView = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    setAddToCartModalOpened: (state, action) => {
      state.isAddToCartModalOpened = action.payload;
    },
    setAddReviewModalOpened: (state, action) => {
      state.isAddReviewModalOpened = action.payload;
    },
    setReviewSuccessOpened: (state, action) => {
      state.isReviewSuccessOpened = action.payload;
    },
    setAllModalsClosed: (state) => {
      state.isAddToCartModalOpened = false;
      state.isAddReviewModalOpened = false;
      state.isReviewSuccessOpened = false;
    },
  },
});

export const {
  setAddToCartModalOpened,
  setAddReviewModalOpened,
  setReviewSuccessOpened,
  setAllModalsClosed,
} = modalView.actions;
