import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">404. Страница не найдена</h1>
          <p>
            <Link to={AppRoute.CatalogPage} className="link">Вернуться в каталог</Link>
          </p>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default NotFoundPage;
