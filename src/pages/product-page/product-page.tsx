import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useParams, Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getRatingStars, getRatingText} from '../../utils';
import ProductTabs from '../../components/product-tabs/product-tabs';
import {fetchCurrentGuitarAction, fetchCommentsAction} from '../../store/api-actions';
import ProductReviews from '../../components/product-reviews/product-reviews';

function ProductPage(): JSX.Element {
  const {id} = useParams();
  const {guitars, isDataLoaded, currentGuitar, isGuitarLoaded, comments} = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  if (isDataLoaded && !guitars.some((guitar) => guitar.id === Number(id))) {
    return <Navigate to={AppRoute.Main} />;
  }

  if (!isGuitarLoaded || currentGuitar.id !== Number(id)) {
    dispatch(fetchCurrentGuitarAction(String(id)));
    dispatch(fetchCommentsAction(String(id)));
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{currentGuitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.Catalog}/page_1`} className="link">Каталог</Link>
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
                {getRatingStars(currentGuitar.rating || 1)}
                <p className="visually-hidden">Оценка: {getRatingText(currentGuitar.rating || 1)}</p>
              </div>

              <ProductTabs guitar={currentGuitar} />

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{currentGuitar.price} ₽</p>
              <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>

          <ProductReviews comments={comments} />

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default ProductPage;
