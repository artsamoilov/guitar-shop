import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GuitarsData} from '../../types/state';
import {Guitar} from '../../types/guitar';

const initialState: GuitarsData = {
  guitars: [],
  isDataLoaded: false,
  currentGuitar: {} as Guitar,
  isGuitarLoading: false,
  isGuitarLoaded: false,
  comments: [],
  isCommentsListLoading: false,
  isCommentsListLoaded: false,
};

export const guitarsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadCurrentGuitar: (state, action) => {
      state.currentGuitar = action.payload;
      state.isGuitarLoading = false;
      state.isGuitarLoaded = true;
    },
    setGuitarLoadingNeeded: (state) => {
      state.isGuitarLoaded = false;
    },
    setGuitarLoading: (state, action) => {
      state.isGuitarLoading = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
      state.isCommentsListLoading = false;
      state.isCommentsListLoaded = true;
    },
    setCommentsListLoading: (state, action) => {
      state.isCommentsListLoading = action.payload;
    },
    addNewComment: (state, action) => {
      state.comments.push(action.payload);
    },
  },
});

export const {
  loadGuitars,
  loadCurrentGuitar,
  setGuitarLoadingNeeded,
  setGuitarLoading,
  loadComments,
  setCommentsListLoading,
  addNewComment,
} = guitarsData.actions;
