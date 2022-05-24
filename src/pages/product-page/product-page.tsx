import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useParams, Navigate} from 'react-router-dom';
import {AppRoute, TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';
import {getRatingStars, getRatingText, isEscKey} from '../../utils';
import ProductTabs from '../../components/product-tabs/product-tabs';
import {fetchCurrentGuitarAction, fetchCommentsAction} from '../../store/api-actions';
import ProductReviews from '../../components/product-reviews/product-reviews';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import React, {SyntheticEvent} from 'react';
import {
  setAddReviewModalOpened,
  setAddToCartModalOpened,
  setCommentsListLoading,
  setGuitarLoading,
  setReviewSuccessOpened
} from '../../store/actions';
import ModalAddReview from '../../components/modal-add-review/modal-add-review';
import ModalSuccessReview from '../../components/modal-success-review/modal-success-review';

function ProductPage(): JSX.Element {
  const {id} = useParams();

  const {
    guitars,
    isDataLoaded,
    currentGuitar,
    isGuitarLoaded,
    isGuitarLoading,
    isCommentsListLoading,
    isAddToCartModalOpened,
    isAddReviewModalOpened,
    isReviewSuccessOpened,
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  if (isDataLoaded && !guitars.some((guitar) => guitar.id === Number(id))) {
    return <Navigate to={AppRoute.Main} />;
  }

  if (!isGuitarLoaded || currentGuitar.id !== Number(id)) {
    if (!isGuitarLoading) {
      dispatch(fetchCurrentGuitarAction(String(id)));
      dispatch(setGuitarLoading(true));
    }
    if (!isCommentsListLoading) {
      dispatch(fetchCommentsAction(String(id)));
      dispatch(setCommentsListLoading(true));
    }
    return <p>Loading...</p>;
  }

  const handleBuyClick = (evt: SyntheticEvent): void => {
    evt.preventDefault();
    dispatch(setAddToCartModalOpened(true));
  };

  const handleEscKeydown = (evt: React.KeyboardEvent): void => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      dispatch(setAddToCartModalOpened(false));
      dispatch(setAddReviewModalOpened(false));
      dispatch(setReviewSuccessOpened(false));
    }
  };

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  document.body.style.overflow = isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened
    ? 'hidden'
    : 'unset';

  return (
    <div onKeyDown={handleEscKeydown} className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link tabIndex={getTabIndex()} to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link tabIndex={getTabIndex()} to={`${AppRoute.Catalog}/page_1`} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">{currentGuitar.name}</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={`/${currentGuitar.previewImg}`} width="90" height="235" alt={currentGuitar.name} />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{currentGuitar.name}</h2>
              <div className="rate product-container__rating">
                {getRatingStars(currentGuitar.rating)}
                <p className="visually-hidden">Оценка: {getRatingText(currentGuitar.rating)}</p>
              </div>

              <ProductTabs guitar={currentGuitar} />

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p>
              <a tabIndex={getTabIndex()} onClick={handleBuyClick} className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>

          <ProductReviews />

        </div>
      </main>

      <Footer />

      <ModalAddToCart guitar={currentGuitar} />

      <ModalAddReview guitar={currentGuitar} />

      <ModalSuccessReview />

    </div>
  );
}

export default ProductPage;
