import {Link, useLocation} from 'react-router-dom';
import {AppRoute, TAB_INDEX_DEFAULT, TAB_INDEX_HIDDEN} from '../../const';
import {useAppSelector} from '../../hooks';

const CATALOG_PAGE_URL = '/catalog/page_';

function Header(): JSX.Element {
  const {pathname} = useLocation();

  const isAddToCartModalOpened = useAppSelector(({MODAL}) => MODAL.isAddToCartModalOpened);
  const isAddReviewModalOpened = useAppSelector(({MODAL}) => MODAL.isAddReviewModalOpened);
  const isReviewSuccessOpened = useAppSelector(({MODAL}) => MODAL.isReviewSuccessOpened);

  const getTabIndex = (): number => isAddToCartModalOpened || isAddReviewModalOpened || isReviewSuccessOpened ? TAB_INDEX_HIDDEN : TAB_INDEX_DEFAULT;

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <a className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип" />
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link tabIndex={getTabIndex()} to={AppRoute.Catalog} className={`link main-nav__link ${pathname.includes(CATALOG_PAGE_URL) && 'link--current'}`}>Каталог</Link>
            </li>
            <li>
              <a tabIndex={getTabIndex()} className="link main-nav__link" href="#">Где купить?</a>
            </li>
            <li>
              <a tabIndex={getTabIndex()} className="link main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form className="form-search__form" id="form-search">
            <button tabIndex={getTabIndex()} className="form-search__submit" type="submit">
              <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-search" />
              </svg>
              <span className="visually-hidden">Начать поиск</span>
            </button>
            <input tabIndex={getTabIndex()} className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?" />
            <label className="visually-hidden" htmlFor="search">Поиск</label>
          </form>
          <ul className="form-search__select-list hidden">
            <li className="form-search__select-item" tabIndex={0}>Четстер Plus</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX2</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX3</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX4</li>
            <li className="form-search__select-item" tabIndex={0}>Четстер UX5</li>
          </ul>
          <button tabIndex={getTabIndex()} className="form-search__reset" type="reset" form="form-search">
            <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a tabIndex={getTabIndex()} className="header__cart-link" href="#" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
