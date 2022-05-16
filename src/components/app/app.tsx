import CatalogPage from '../../pages/catalog-page/catalog-page';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import ProductPage from '../../pages/product-page/product-page';
import CartPage from '../../pages/cart-page/cart-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={AppRoute.Catalog} />}
        />
        <Route
          path={AppRoute.Catalog}
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
          element={<Navigate to={AppRoute.Catalog} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
