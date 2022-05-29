import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import {Link} from 'react-router-dom';
import {AppRoute, OVERFLOW_DEFAULT_SCROLL, OVERFLOW_LOCKED_SCROLL} from '../../const';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import React, {useState} from 'react';
import {Guitar} from '../../types/guitar';
import {isEscKey} from '../../utils';
import {setAddToCartModalOpened} from '../../store/modal-view/modal-view';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

function CatalogPage(): JSX.Element {
  const {isAddToCartModalOpened, isAddReviewModalOpened, isReviewSuccessOpened} = useAppSelector(({MODAL}) => MODAL);

  const [currentGuitar, setCurrentGuitar] = useState({} as Guitar);

  const dispatch = useAppDispatch();

  const handleEscKeydown = (evt: React.KeyboardEvent): void => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      dispatch(setAddToCartModalOpened(false));
    }
  };

  document.body.style.overflow = isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened
    ? OVERFLOW_LOCKED_SCROLL
    : OVERFLOW_DEFAULT_SCROLL;

  return (
    <div onKeyDown={handleEscKeydown} className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Catalog} className="link">Каталог</Link>
            </li>
          </ul>

          <Catalog setCurrentGuitar={setCurrentGuitar} />

        </div>
      </main>

      <Footer />

      <ModalAddToCart guitar={currentGuitar} />

    </div>
  );
}

export default CatalogPage;
