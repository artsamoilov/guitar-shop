import {SyntheticEvent, useRef} from 'react';
import {setReviewSuccessOpened} from '../../store/modal-view/modal-view';
import {useAppDispatch, useAppSelector} from '../../hooks';

function ModalSuccessReview(): JSX.Element {
  const isReviewSuccessModalOpened = useAppSelector(({MODAL}) => MODAL.isReviewSuccessOpened);

  const dispatch = useAppDispatch();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setReviewSuccessOpened(false));
  };

  if (isReviewSuccessModalOpened) {
    buttonRef.current?.focus();
  }

  return (
    <div className={`modal ${isReviewSuccessModalOpened && 'is-active'} modal--success`}>
      <div className="modal__wrapper">
        <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <p className="modal__message">Спасибо за ваш отзыв!</p>
          <div className="modal__button-container modal__button-container--review">
            <button ref={buttonRef} autoFocus={isReviewSuccessModalOpened} onClick={handleCloseClick} className="button button--small modal__button modal__button--review">К покупкам!</button>
          </div>
          <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon" />
            <span className="modal__close-btn-interactive-area" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;
