import {
  guitarsData,
  loadGuitars,
  loadCurrentGuitar,
  setGuitarLoading,
  loadComments,
  setCommentsListLoading,
  addNewComment
} from './guitars-data';
import {getMockGuitars, getMockComments} from '../../mocks/mocks';
import {Guitar} from '../../types/guitar';

const fakeGuitars = getMockGuitars();
const fakeComments = getMockComments(1);

describe('reducer: GuitarsData', () => {
  it('should return initial state without parameters', () => {
    expect(guitarsData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: {} as Guitar,
        isGuitarLoading: false,
        isGuitarLoaded: false,
        comments: [],
        isCommentsListLoading: false,
        isCommentsListLoaded: false,
      });
  });

  it('should update guitars by loadGuitars', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, loadGuitars(fakeGuitars)))
      .toEqual({
        guitars: fakeGuitars,
        isDataLoaded: true,
        currentGuitar: {} as Guitar,
        isGuitarLoading: false,
        isGuitarLoaded: false,
        comments: [],
        isCommentsListLoading: false,
        isCommentsListLoaded: false,
      });
  });

  it('should update currentGuitar by loadCurrentGuitar', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, loadCurrentGuitar(fakeGuitars[0])))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: fakeGuitars[0],
        isGuitarLoading: false,
        isGuitarLoaded: true,
        comments: [],
        isCommentsListLoading: false,
        isCommentsListLoaded: false,
      });
  });

  it('should update isGuitarLoading by setGuitarLoading', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, setGuitarLoading(true)))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: {} as Guitar,
        isGuitarLoading: true,
        isGuitarLoaded: false,
        comments: [],
        isCommentsListLoading: false,
        isCommentsListLoaded: false,
      });
  });

  it('should update comments by loadComments', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, loadComments(fakeComments)))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: {} as Guitar,
        isGuitarLoading: false,
        isGuitarLoaded: false,
        comments: fakeComments,
        isCommentsListLoading: false,
        isCommentsListLoaded: true,
      });
  });

  it('should update isCommentsListLoading by setCommentsListLoading', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, setCommentsListLoading(true)))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: {} as Guitar,
        isGuitarLoading: false,
        isGuitarLoaded: false,
        comments: [],
        isCommentsListLoading: true,
        isCommentsListLoaded: false,
      });
  });

  it('should update comments by addNewComment', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
      currentGuitar: {} as Guitar,
      isGuitarLoading: false,
      isGuitarLoaded: false,
      comments: [],
      isCommentsListLoading: false,
      isCommentsListLoaded: false,
    };
    expect(guitarsData.reducer(state, addNewComment(fakeComments[0])))
      .toEqual({
        guitars: [],
        isDataLoaded: false,
        currentGuitar: {} as Guitar,
        isGuitarLoading: false,
        isGuitarLoaded: false,
        comments: [fakeComments[0]],
        isCommentsListLoading: false,
        isCommentsListLoaded: false,
      });
  });
});
