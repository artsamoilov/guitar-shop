import {
  modalView,
  setAddReviewModalOpened,
  setReviewSuccessOpened,
  setAddToCartModalOpened,
  setAllModalsClosed
} from './modal-view';

describe('reducer: ModalView', () => {
  it('should return initial state without parameters', () => {
    expect(modalView.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: false});
  });

  it('should set add review modal opened', () => {
    const store = {isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: false};
    expect(modalView.reducer(store, setAddReviewModalOpened(true)))
      .toEqual({isAddToCartModalOpened: false, isAddReviewModalOpened: true, isReviewSuccessOpened: false});
  });

  it('should set add to cart modal opened', () => {
    const store = {isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: false};
    expect(modalView.reducer(store, setAddToCartModalOpened(true)))
      .toEqual({isAddToCartModalOpened: true, isAddReviewModalOpened: false, isReviewSuccessOpened: false});
  });

  it('should set review success modal opened', () => {
    const store = {isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: false};
    expect(modalView.reducer(store, setReviewSuccessOpened(true)))
      .toEqual({isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: true});
  });

  it('should close all the modals', () => {
    const store = {isAddToCartModalOpened: true, isAddReviewModalOpened: true, isReviewSuccessOpened: true};
    expect(modalView.reducer(store, setAllModalsClosed()))
      .toEqual({isAddToCartModalOpened: false, isAddReviewModalOpened: false, isReviewSuccessOpened: false});
  });
});
