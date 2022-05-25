export enum NameSpace {
  Data = 'DATA',
  Modal = 'MODAL',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/comments',
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page_:id',
  Item = '/catalog/item/:id',
  Cart = '/catalog/cart',
  NotFound = '/404',
}

export const GuitarType: {[key: string]: string} = {
  Acoustic: 'Акустическая',
  Electric: 'Электрогитара',
  Ukulele: 'Укулеле',
};

export enum HTTPCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const CARDS_BY_PAGE = 9;
export const INITIAL_PAGE = 1;

export const TAB_INDEX_DEFAULT = 0;
export const TAB_INDEX_HIDDEN = -1;

export const RATES = [1, 2, 3, 4, 5];
export const TEXT_RATES = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];
