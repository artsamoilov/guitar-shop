import {SyntheticEvent} from 'react';
import {setReviewSuccessOpened} from '../../store/modal-view/modal-view';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import FocusTrap from 'focus-trap-react';

const REVIEW_SUCCESS_BUTTON_ID = '#review-success-button';

function ModalSuccessReview(): JSX.Element {
  const isReviewSuccessModalOpened = useAppSelector(({MODAL}) => MODAL.isReviewSuccessOpened);

  const dispatch = useAppDispatch();

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setReviewSuccessOpened(false));
  };

  return (
    <FocusTrap active={isReviewSuccessModalOpened} focusTrapOptions={{allowOutsideClick: true, fallbackFocus: REVIEW_SUCCESS_BUTTON_ID}}>
      <div className={`modal ${isReviewSuccessModalOpened && 'is-active'} modal--success`}>
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button id="review-success-button" onClick={handleCloseClick} className="button button--small modal__button modal__button--review">К покупкам!</button>
            </div>
            <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon" />
              <span className="modal__close-btn-interactive-area" />
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ModalSuccessReview;
