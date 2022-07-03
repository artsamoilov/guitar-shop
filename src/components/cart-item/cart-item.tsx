import {Guitar} from '../../types/guitar';
import {getGuitarType} from '../../utils';
import {useRef, useState} from 'react';

type PropsType = {
  guitar: Guitar,
}

function CartItem({guitar}: PropsType): JSX.Element {
  const quantityRef = useRef<HTMLInputElement | null>(null);

  const [quantity, setQuantity] = useState(1);

  const handlePriceChange = (): void => {
    quantityRef.current && setQuantity(Number(quantityRef.current.value));
  };

  const handleIncrementClick = (): void => setQuantity(quantity + 1);

  const handleDecrementClick = (): void => {
    if (quantityRef.current && quantityRef.current.value === '1') {
      console.log(quantity);
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
      </button>
      <div className="cart-item__image">
        <img src={`/${guitar.previewImg}`} width="55" height="130" alt={guitar.name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{`${getGuitarType(guitar)} ${guitar.name}`}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{`${getGuitarType(guitar)}, ${guitar.stringCount} струнная`}</p>
      </div>
      <div className="cart-item__price">{guitar.price}&nbsp;₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={handleDecrementClick} className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus" />
          </svg>
        </button>
        <input onChange={handlePriceChange} ref={quantityRef} value={quantity} className="quantity__input" type="number" placeholder="1" id="2-count" name="2-count" max="99" />
        <button onClick={handleIncrementClick} className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus" />
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{guitar.price * quantity}&nbsp;₽</div>
    </div>
  );
}

export default CartItem;
