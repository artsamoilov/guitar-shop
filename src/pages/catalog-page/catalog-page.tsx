import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';

function CatalogPage(): JSX.Element {
  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a href="/" className="link">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="link">Каталог</a>
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
