import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {guitarsData} from './guitars-data/guitars-data';
import {modalView} from './modal-view/modal-view';
import {cartData} from './cart-data/cart-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarsData.reducer,
  [NameSpace.Modal]: modalView.reducer,
  [NameSpace.Cart]: cartData.reducer,
});
