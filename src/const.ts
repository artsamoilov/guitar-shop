export enum NameSpace {
  Data = 'DATA',
  Modal = 'MODAL',
  Cart = 'CART',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
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

export const OVERFLOW_LOCKED_SCROLL = 'hidden';
export const OVERFLOW_DEFAULT_SCROLL = 'unset';

export const RATES = [1, 2, 3, 4, 5];
export const TEXT_RATES = ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'];

export enum SearchParam {
  SortType = '_sort',
  SortOrder = '_order',
  PriceFrom = 'price_gte',
  PriceTo = 'price_lte',
  Type = 'type',
  Strings = 'stringCount',
}

export enum SortingType {
  Price = 'price',
  Rating = 'rating',
}

export enum SortingOrder {
  Ascendant = 'asc',
  Descendant = 'desc',
}

export enum FilterGuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum FilterStrings {
  Strings4 = '4',
  Strings6 = '6',
  Strings7 = '7',
  Strings12 = '12',
}

export enum CouponCode {
  Light = 'light-333',
  Medium = 'medium-444',
  High = 'height-555',
}
