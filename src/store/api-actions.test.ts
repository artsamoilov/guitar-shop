import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../service/api';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {getMockGuitars, getMockComments} from '../mocks/mocks';
import {loadGuitars, loadCurrentGuitar, loadComments} from './guitars-data/guitars-data';
import {fetchGuitarsAction, fetchCurrentGuitarAction, fetchCommentsAction, postCommentAction} from './api-actions';
import {CommentPost} from '../types/comment-post';
import {GUITARS_FETCH_OPTION} from './api-actions';

const fakeGuitars = getMockGuitars();
const fakeComments = getMockComments(1);

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch loadGuitars when GET /guitars', async () => {
    mockAPI.onGet(`${APIRoute.Guitars}${GUITARS_FETCH_OPTION}`).reply(200, fakeGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadGuitars.toString());
  });

  it('should dispatch loadCurrentGuitar when GET /guitars/:id', async () => {
    const ID = '1';
    mockAPI.onGet(`${APIRoute.Guitars}/${ID}`).reply(200, fakeGuitars[0]);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(ID));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadCurrentGuitar.toString());
  });

  it('should dispatch loadComments when GET /guitars/:id/comments', async () => {
    const ID = '1';
    mockAPI.onGet(`${APIRoute.Guitars}/${ID}/comments`).reply(200, fakeComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(ID));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadComments.toString());
  });

  it('should post new comment when POST /comments', async () => {
    const postComment: CommentPost = {
      guitarId: 1,
      userName: 'test userName',
      advantage: 'test advantage',
      disadvantage: 'test disadvantage',
      comment: 'test comment',
      rating: 1,
    };
    mockAPI.onPost(APIRoute.Comments).reply(200, fakeComments[0]);

    const store = mockStore();
    await store.dispatch(postCommentAction(postComment));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain('data/postComment/fulfilled');
  });
});
