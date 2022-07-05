import {store} from '../store/store';
import {Guitar} from './guitar';
import {Comment} from './comment';

export type GuitarsData = {
  guitars: Guitar[],
  isDataLoaded: boolean,
  currentGuitar: Guitar,
  isGuitarLoading: boolean,
  isGuitarLoaded: boolean,
  comments: Comment[],
  isCommentsListLoading: boolean,
  isCommentsListLoaded: boolean,
  guitarsSearchList: Guitar[],
  isSearchListLoaded: boolean,
  isSearchParamsChanged: boolean,
}

export type ModalView = {
  isAddToCartModalOpened: boolean,
  isCartDeleteModalOpened: boolean,
  isCartSuccessModalOpened: boolean,
  isAddReviewModalOpened: boolean,
  isReviewSuccessOpened: boolean,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
