import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {AppRoute, CouponCode, OVERFLOW_DEFAULT_SCROLL, OVERFLOW_LOCKED_SCROLL} from '../../const';
import {Link} from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import ModalCartDelete from '../../components/modal-cart-delete/modal-cart-delete';
import React, {SyntheticEvent, useRef} from 'react';
import {isEscKey} from '../../utils';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';
import {Guitar} from '../../types/guitar';
import {postCouponAction, postOrderAction} from '../../store/api-actions';
import {loadCoupon, removeDiscount} from '../../store/cart-data/cart-data';

function CartPage(): JSX.Element {
  const isCartDeleteModalOpened = useAppSelector(({MODAL}) => MODAL.isCartDeleteModalOpened);
  const cartGuitars = useAppSelector(({CART}) => CART.cartGuitars);
  const coupon = useAppSelector(({CART}) => CART.coupon);
  const discount = useAppSelector(({CART}) => CART.discount);
  const isCouponCorrect = useAppSelector(({CART}) => CART.isCouponCorrect);

  const dispatch = useAppDispatch();

  const couponInputRef = useRef<HTMLInputElement | null>(null);

  const handleEscKeydown = (evt: React.KeyboardEvent): void => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      dispatch(setAllModalsClosed());
    }
  };

  const handleCouponAdd = (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (couponInputRef.current && couponInputRef.current.value !== '') {
      if (Object.values(CouponCode).includes(couponInputRef.current.value as CouponCode)) {
        dispatch(loadCoupon(couponInputRef.current.value));
        dispatch(postCouponAction({coupon: couponInputRef.current.value}));
        couponInputRef.current.value = '';
        return;
      }
      dispatch(removeDiscount());
      couponInputRef.current.value = '';
    }
  };

  const handleCheckoutClick = () => {
    if (cartGuitars.length > 0) {
      dispatch(postOrderAction({
        guitarsIds: cartGuitars.map((guitar) => guitar.id),
        coupon: coupon,
      }));
    }
  };

  const getUniqueCartGuitars = (): Guitar[] => [...new Set(cartGuitars)];
  const totalPrice = cartGuitars.reduce((previousValue, guitar) => previousValue + guitar.price, 0);

  document.body.style.overflow = isCartDeleteModalOpened ? OVERFLOW_LOCKED_SCROLL : OVERFLOW_DEFAULT_SCROLL;

  return (
    <div onKeyDown={handleEscKeydown} className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.Catalog}/page_1`} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Cart} className="link">Корзина</Link>
            </li>
          </ul>
          <div className="cart">

            {cartGuitars.length > 0 && getUniqueCartGuitars().map((guitar) => <CartItem key={guitar.id} guitar={guitar} />)}

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input ref={couponInputRef} type="text" placeholder="Введите промокод" id="coupon" name="coupon" />

                    {
                      isCouponCorrect !== null && (
                        isCouponCorrect
                          ? <p className="form-input__message form-input__message--success">Промокод принят</p>
                          : <p className="form-input__message form-input__message--error">неверный промокод</p>
                      )
                    }

                  </div>
                  <button onClick={handleCouponAdd} className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{totalPrice}&nbsp;₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">{discount && cartGuitars.length > 0 ? `- ${totalPrice * (Number(discount) / 100)}` : 0}&nbsp;₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{discount ? totalPrice - totalPrice * (Number(discount) / 100) : totalPrice}&nbsp;₽</span>
                </p>
                <button onClick={handleCheckoutClick} className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCartDelete />

    </div>
  );
}

export default CartPage;
