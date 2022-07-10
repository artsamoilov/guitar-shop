import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import FocusTrap from 'focus-trap-react';
import {setCartSuccessModalOpened} from '../../store/modal-view/modal-view';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';

const GO_TO_CART_BUTTON_ID = '#go-to-cart-button';

function ModalSuccessAdd(): JSX.Element {
  const isCartSuccessModalOpened = useAppSelector(({MODAL}) => MODAL.isCartSuccessModalOpened);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseClick = (): void => {
    dispatch(setCartSuccessModalOpened(false));
  };

  const handleCheckoutClick = (): void => {
    dispatch(setCartSuccessModalOpened(false));
    navigate(AppRoute.Cart);
  };

  const handleContinueShoppingClick = (): void => {
    dispatch(setCartSuccessModalOpened(false));
    navigate(`${AppRoute.Catalog}/page_1`);
  };

  return (
    <FocusTrap active={isCartSuccessModalOpened} focusTrapOptions={{allowOutsideClick: true, fallbackFocus: GO_TO_CART_BUTTON_ID}}>
      <div className={`modal ${isCartSuccessModalOpened && 'is-active'} modal--success`}>
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success" />
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button onClick={handleCheckoutClick} id="go-to-cart-button" className="button button--small modal__button">Перейти в корзину</button>
              <button onClick={handleContinueShoppingClick} className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
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

export default ModalSuccessAdd;
