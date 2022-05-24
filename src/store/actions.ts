import {createAction} from '@reduxjs/toolkit';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

const loadGuitars = createAction<Guitar[]>('data/loadGuitars');

const loadCurrentGuitar = createAction<Guitar>('data/loadCurrentGuitar');

const setGuitarLoadingNeeded = createAction('data/setGuitarNotLoaded');

const loadComments = createAction<Comment[]>('data/loadComments');

const setAddToCartModalOpened = createAction<boolean>('modal/setAddToCartModalOpened');

const setAddReviewModalOpened = createAction<boolean>('modal/setAddReviewModalOpened');

const setReviewSuccessOpened = createAction<boolean>('modal/setReviewSuccessOpened');

const setGuitarLoading = createAction<boolean>('data/setGuitarLoading');

const setCommentsListLoading = createAction<boolean>('data/setCommentsListLoading');

const addNewComment = createAction<Comment>('data/addNewComment');

const setAllModalsClosed = createAction('modal/setAllModalsClosed');

export {
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
};
