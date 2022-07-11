import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {CartData} from '../../types/state';
import {Guitar} from '../../types/guitar';

const initialState: CartData = {
  cartGuitars: [] as Guitar[],
  deletingGuitar: {} as Guitar,
  coupon: null,
  discount: null,
  isCouponCorrect: null,
};

export const cartData = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addGuitarToCart: (state, action) => {
      if (state.cartGuitars.find((guitar) => guitar.id === action.payload.id)) {
        const guitarIndex = state.cartGuitars.findIndex((guitar) => guitar.id === action.payload.id);
        state.cartGuitars = [...state.cartGuitars.slice(0, guitarIndex), action.payload, ...state.cartGuitars.slice(guitarIndex)];
      } else {
        state.cartGuitars = [action.payload, ...state.cartGuitars];
      }
    },
    setDeletingGuitar: (state, action) => {
      state.deletingGuitar = action.payload;
    },
    removeGuitarFromCart: (state, action) => {
      const guitarIndex = state.cartGuitars.findIndex((guitar) => guitar.id === action.payload.id);
      state.cartGuitars = [...state.cartGuitars.slice(0, guitarIndex), ...state.cartGuitars.slice(guitarIndex + 1)];
    },
    deleteGuitar: (state, action) => {
      state.cartGuitars = state.cartGuitars.slice().filter((guitar) => guitar.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cartGuitars = [];
      state.deletingGuitar = {} as Guitar;
      state.coupon = null;
      state.discount = null;
      state.isCouponCorrect = null;
    },
    loadCoupon: (state, action) => {
      state.coupon = action.payload;
    },
    loadDiscount: (state, action) => {
      state.discount = action.payload;
      state.isCouponCorrect = true;
    },
    removeDiscount: (state) => {
      state.coupon = null;
      state.discount = null;
      state.isCouponCorrect = false;
    },
  },
});

export const {
  addGuitarToCart,
  setDeletingGuitar,
  removeGuitarFromCart,
  deleteGuitar,
  clearCart,
  loadCoupon,
  loadDiscount,
  removeDiscount,
} = cartData.actions;
