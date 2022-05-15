import {CouponCode} from '../const';

export type OrderPost = {
  guitarsIds: number[],
  coupon: CouponCode | null,
}
