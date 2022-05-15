export enum CouponCode {
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  GuitarComments = '/guitars/:id/comments',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Item = '/catalog/:id',
  Cart = '/catalog/cart',
  NotFound = '/404',
}

export const CARDS_BY_PAGE = 9;
export const INITIAL_PAGE = 1;
