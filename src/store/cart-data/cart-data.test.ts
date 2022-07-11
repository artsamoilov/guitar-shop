import {
  cartData,
  addGuitarToCart,
  setDeletingGuitar,
  removeGuitarFromCart,
  deleteGuitar,
  clearCart,
  loadCoupon,
  loadDiscount,
  removeDiscount
} from './cart-data';
import {getMockGuitars} from '../../mocks/mocks';
import {Guitar} from '../../types/guitar';
import {CouponCode} from '../../const';

const fakeGuitars = getMockGuitars();

describe ('reducer: CartData', () => {
  it('should return initial state without parameters', () => {
    expect(cartData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update guitars by addGuitarToCart', () => {
    const state = {
      cartGuitars: [],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, addGuitarToCart(fakeGuitars[0])))
      .toEqual(
        {
          cartGuitars: [fakeGuitars[0]],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update deletingGuitar by setDeletingGuitar', () => {
    const state = {
      cartGuitars: [],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, setDeletingGuitar(fakeGuitars[0])))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: fakeGuitars[0],
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update guitars by removeGuitarFromCart', () => {
    const state = {
      cartGuitars: [fakeGuitars[0]],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, removeGuitarFromCart(fakeGuitars[0])))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update guitars by deleteGuitar', () => {
    const state = {
      cartGuitars: [fakeGuitars[0], fakeGuitars[0]],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, deleteGuitar(fakeGuitars[0])))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should return initial state by clearCart', () => {
    const state = {
      cartGuitars: [fakeGuitars[0], fakeGuitars[0]],
      deletingGuitar: fakeGuitars[0],
      coupon: CouponCode.Light,
      discount: 15,
      isCouponCorrect: true,
    };
    expect(cartData.reducer(state, clearCart()))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update coupon by loadCoupon', () => {
    const state = {
      cartGuitars: [],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, loadCoupon(CouponCode.Light)))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: CouponCode.Light,
          discount: null,
          isCouponCorrect: null,
        });
  });

  it('should update discount by loadDiscount', () => {
    const state = {
      cartGuitars: [],
      deletingGuitar: {} as Guitar,
      coupon: null,
      discount: null,
      isCouponCorrect: null,
    };
    expect(cartData.reducer(state, loadDiscount(15)))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: 15,
          isCouponCorrect: true,
        });
  });

  it('should remove discount and coupon by removeDiscount', () => {
    const state = {
      cartGuitars: [],
      deletingGuitar: {} as Guitar,
      coupon: CouponCode.Light,
      discount: 15,
      isCouponCorrect: true,
    };
    expect(cartData.reducer(state, removeDiscount()))
      .toEqual(
        {
          cartGuitars: [],
          deletingGuitar: {} as Guitar,
          coupon: null,
          discount: null,
          isCouponCorrect: false,
        });
  });
});
