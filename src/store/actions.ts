import {createAction} from '@reduxjs/toolkit';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

const loadGuitars = createAction<Guitar[]>('data/loadGuitars');

const loadCurrentGuitar = createAction<Guitar>('data/loadCurrentGuitar');

const setGuitarLoadingNeeded = createAction('data/setGuitarNotLoaded');

const loadComments = createAction<Comment[]>('data/loadComments');

const setAddToCartModalOpened = createAction<boolean>('modal/setAddToCartModalOpened');

export {loadGuitars, loadCurrentGuitar, setGuitarLoadingNeeded, loadComments, setAddToCartModalOpened};
