import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {AppRoute, OVERFLOW_DEFAULT_SCROLL, OVERFLOW_LOCKED_SCROLL} from '../../const';
import {Link} from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import ModalCartDelete from '../../components/modal-cart-delete/modal-cart-delete';
import React, {SyntheticEvent, useRef} from 'react';
import {getSeparatedPrice, isEscKey} from '../../utils';
import {setAllModalsClosed} from '../../store/modal-view/modal-view';
import {Guitar} from '../../types/guitar';
import {postCouponAction, postOrderAction} from '../../store/api-actions';

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
      dispatch(postCouponAction({coupon: couponInputRef.current.value}));
      couponInputRef.current.value = '';
    }
  };

  const handleCouponChange = () => {
    if (couponInputRef.current && couponInputRef.current.value !== '') {
      couponInputRef.current.value = couponInputRef.current.value.replace(/\s+/g, '');
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
  const discountPrice = Math.ceil(totalPrice * (Number(discount) / 100));

  document.body.style.overflow = isCartDeleteModalOpened ? OVERFLOW_LOCKED_SCROLL : OVERFLOW_DEFAULT_SCROLL;

  return (
    <div onKeyDown={handleEscKeydown} className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">??????????????</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">??????????????</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.Catalog}/page_1`} className="link">??????????????</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Cart} className="link">??????????????</Link>
            </li>
          </ul>
          <div className="cart">

            {cartGuitars.length > 0 && getUniqueCartGuitars().map((guitar) => <CartItem key={guitar.id} guitar={guitar} />)}

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">???????????????? ???? ????????????</h2>
                <p className="coupon__info">?????????????? ???????? ????????????????, ???????? ???? ?? ?????? ????????.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">????????????????</label>
                    <input ref={couponInputRef} onChange={handleCouponChange} type="text" placeholder="?????????????? ????????????????" id="coupon" name="coupon" />

                    {
                      isCouponCorrect !== null && (
                        isCouponCorrect
                          ? <p className="form-input__message form-input__message--success">???????????????? ????????????</p>
                          : <p className="form-input__message form-input__message--error">???????????????? ????????????????</p>
                      )
                    }

                  </div>
                  <button onClick={handleCouponAdd} className="button button--big coupon__button">??????????????????</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">??????????:</span>
                  <span className="cart__total-value">{getSeparatedPrice(totalPrice)}&nbsp;???</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">????????????:</span>
                  <span className={`cart__total-value ${discountPrice > 0 ? 'cart__total-value--bonus' : ''}`}>{discount && cartGuitars.length > 0 ? `- ${getSeparatedPrice(discountPrice)}` : 0}&nbsp;???</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">?? ????????????:</span>
                  <span className="cart__total-value cart__total-value--payment">{discount ? getSeparatedPrice(totalPrice - discountPrice) : getSeparatedPrice(totalPrice)}&nbsp;???</span>
                </p>
                <button onClick={handleCheckoutClick} className="button button--red button--big cart__order-button">???????????????? ??????????</button>
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
