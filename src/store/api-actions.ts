import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './store';
import {loadGuitars, loadCurrentGuitar, loadComments} from './actions';
import {APIRoute} from '../const';
import {Guitar} from '../types/guitar';
import {Comment} from '../types/comment';
import {CommentPost} from '../types/comment-post';

const GUITARS_FETCH_OPTION = '?_limit=27';

const fetchGuitarsAction = createAsyncThunk(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}${GUITARS_FETCH_OPTION}`);
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
    const {data} = await api.get<Comment[]>(`${APIRoute.Guitars}/${id}${APIRoute.Comments}`);
    store.dispatch(loadComments(data));
  },
);

const postCommentAction = createAsyncThunk(
  'data/postComment',
  async ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentPost) => {
    await api.post(APIRoute.Comments, {
      guitarId: guitarId,
      userName: userName,
      advantage: advantage,
      disadvantage: disadvantage,
      comment: comment,
      rating: Number(rating),
    });
  },
);

export {fetchGuitarsAction, fetchCurrentGuitarAction, fetchCommentsAction, postCommentAction};
