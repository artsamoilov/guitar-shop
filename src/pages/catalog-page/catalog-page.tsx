import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import React, {useState} from 'react';
import {Guitar} from '../../types/guitar';
import {isEscKey} from '../../utils';
import {setAddToCartModalOpened} from '../../store/actions';
import {useAppDispatch} from '../../hooks';

function CatalogPage(): JSX.Element {
  const [currentGuitar, setCurrentGuitar] = useState({} as Guitar);

  const dispatch = useAppDispatch();

  const handleEscKeydown = (evt: React.KeyboardEvent): void => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      dispatch(setAddToCartModalOpened(false));
    }
  };

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
