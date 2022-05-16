import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function CatalogPage(): JSX.Element {
  return (
    <div className="wrapper">

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

          <Catalog />

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default CatalogPage;
