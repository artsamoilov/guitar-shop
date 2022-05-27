import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {getMockGuitars} from '../../mocks/mocks';
import Catalog from './catalog';

const mockStore = configureMockStore();

const fakeGuitars = getMockGuitars();

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
  DATA: {
    guitars: fakeGuitars,
    isDataLoaded: true,
    currentGuitar: fakeGuitars[0],
    isGuitarLoading: false,
    isGuitarLoaded: true,
    comments: [],
    isCommentsListLoading: false,
    isCommentsListLoaded: true,
  },
});

const history = createMemoryHistory();

describe('component Catalog',() => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog setCurrentGuitar={() => undefined} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
