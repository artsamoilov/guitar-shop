import {Guitar} from '../../types/guitar';
import {getGuitarType} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {SyntheticEvent} from 'react';
import {setCartDeleteModalOpened} from '../../store/modal-view/modal-view';

type PropsType = {
  guitar: Guitar,
}

function ModalCartDelete({guitar}: PropsType): JSX.Element {
  const isCartDeleteModalOpened = useAppSelector(({MODAL}) => MODAL.isCartDeleteModalOpened);

  const dispatch = useAppDispatch();

  const handleCloseClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setCartDeleteModalOpened(false));
  };

  return (
    <div className={`modal ${isCartDeleteModalOpened && 'is-active'}`}>
      <div className="modal__wrapper">
        <div onClick={handleCloseClick} className="modal__overlay" data-close-modal />
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img className="modal__img" src={`/${guitar.previewImg}`} width="67" height="137" alt={guitar.name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{getGuitarType(guitar)}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitar.price}&nbsp;₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--small modal__button">Удалить товар</button>
            <button onClick={handleCloseClick} className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
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

export default ModalCartDelete;
