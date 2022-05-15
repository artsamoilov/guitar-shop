import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './store';
import {loadGuitars} from './actions';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';

const fetchGuitarsAction = createAsyncThunk(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    store.dispatch(loadGuitars(data));
  },
);

export {fetchGuitarsAction};
