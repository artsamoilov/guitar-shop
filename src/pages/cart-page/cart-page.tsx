import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {AppRoute, OVERFLOW_DEFAULT_SCROLL, OVERFLOW_LOCKED_SCROLL} from '../../const';
import {Link} from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import ModalCartDelete from '../../components/modal-cart-delete/modal-cart-delete';
import React from 'react';
import {isEscKey} from '../../utils';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';

function CartPage(): JSX.Element {
  const guitars = useAppSelector(({DATA}) => DATA.guitars);
  const isCartDeleteModalOpened = useAppSelector(({MODAL}) => MODAL.isCartDeleteModalOpened);

  const dispatch = useAppDispatch();

  const handleEscKeydown = (evt: React.KeyboardEvent): void => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      dispatch(setAllModalsClosed());
    }
  };

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

            <CartItem guitar={guitars[0]} />

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">52 000 ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">49 000 ₽</span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ModalCartDelete guitar={guitars[0]} />

    </div>
  );
}

export default CartPage;
