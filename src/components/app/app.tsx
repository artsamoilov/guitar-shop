import CatalogPage from '../../pages/catalog-page/catalog-page';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import CartPage from '../../pages/cart-page/cart-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const FIRST_PAGE_URL = '/catalog/page_1';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Navigate to={FIRST_PAGE_URL} />}
      />
      <Route
        path={AppRoute.Catalog}
        element={<Navigate to={FIRST_PAGE_URL} />}
      />
      <Route
        path={AppRoute.CatalogPage}
        element={<CatalogPage />}
      />
      <Route
        path={AppRoute.Item}
        element={<ProductPage />}
      />
      <Route
        path={AppRoute.Cart}
        element={<CartPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
