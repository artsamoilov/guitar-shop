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
  guitarsSearchList: [],
  isSearchListLoaded: true,
  isSearchParamsChanged: false,
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
    loadGuitarsSearchList: (state, action) => {
      state.guitarsSearchList = action.payload;
      state.isSearchListLoaded = true;
    },
    setGuitarsSearchListLoading: (state) => {
      state.isSearchListLoaded = false;
    },
    clearGuitarsSearchList: (state) => {
      state.guitarsSearchList = [];
      state.isSearchListLoaded = true;
    },
    setSearchParamsChanged: (state) => {
      state.isSearchParamsChanged = true;
    },
  },
});

export const {
  loadGuitars,
  loadCurrentGuitar,
  setGuitarLoading,
  loadComments,
  setCommentsListLoading,
  addNewComment,
  loadGuitarsSearchList,
  setGuitarsSearchListLoading,
  clearGuitarsSearchList,
  setSearchParamsChanged,
} = guitarsData.actions;
