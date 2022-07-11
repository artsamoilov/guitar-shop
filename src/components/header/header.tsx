import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';
import FormSearch from '../form-search/form-search';
import {useAppSelector} from '../../hooks/hooks';

const CATALOG_PAGE_URL = '/catalog/page_';

function Header(): JSX.Element {
  const {pathname} = useLocation();

  const cartGuitars = useAppSelector(({CART}) => CART.cartGuitars);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to={AppRoute.Main} className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link to={AppRoute.Catalog} className={`link main-nav__link ${pathname.includes(CATALOG_PAGE_URL) && 'link--current'}`}>Каталог</Link>
            </li>
            <li>
              <a className="link main-nav__link" href="/">Где купить?</a>
            </li>
            <li>
              <a className="link main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>

        <FormSearch />

        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>

          {cartGuitars.length > 0 && <span className="header__cart-count">{cartGuitars.length}</span>}

        </Link>
      </div>
    </header>
  );
}

export default Header;
