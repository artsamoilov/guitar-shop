import {Guitar} from '../../types/guitar';
import {getGuitarType} from '../../utils';
import {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setAddToCartModalOpened} from '../../store/modal-view/modal-view';

type PropsType = {
  guitar: Guitar,
}

function ModalAddToCart({guitar}: PropsType): JSX.Element {
  const isAddToCartModalOpened = useAppSelector(({MODAL}) => MODAL.isAddToCartModalOpened);

  const dispatch = useAppDispatch();

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setAddToCartModalOpened(false));
  };

  return (
    <div className={`modal ${isAddToCartModalOpened && 'is-active'}`}>
      <div className="modal__wrapper">
        <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img className="modal__img" src={`/${guitar.previewImg}`} width="67" height="137" alt={guitar.name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул:&nbsp;{guitar.vendorCode}</p>
              <p className="modal__product-params">{guitar.type && getGuitarType(guitar)},&nbsp;{guitar.stringCount}&nbsp;струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitar.price}&nbsp;₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
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

export default ModalAddToCart;
