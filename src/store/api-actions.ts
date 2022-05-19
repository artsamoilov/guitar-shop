import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './store';
import {loadGuitars, loadCurrentGuitar, loadComments} from './actions';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';

const fetchGuitarsAction = createAsyncThunk(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}?_limit=27`);
    store.dispatch(loadGuitars(data));
  },
);

const fetchCurrentGuitarAction = createAsyncThunk(
  'data/fetchCurrentGuitar',
  async (id: string) => {
    const {data} = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
    store.dispatch(loadCurrentGuitar(data));
  },
);

const fetchCommentsAction = createAsyncThunk(
  'data/fetchComments',
  async (id: string) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Guitars}/${id}/comments`);
    store.dispatch(loadComments(data));
  },
);

export {fetchGuitarsAction, fetchCurrentGuitarAction, fetchCommentsAction};
