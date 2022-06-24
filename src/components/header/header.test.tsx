import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import {getMockGuitars} from '../../mocks/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const fakeGuitars = getMockGuitars();

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
  DATA: {
    guitars: fakeGuitars,
    guitarsSearchList: [fakeGuitars[0]],
    isSearchListLoaded: true,
  },
});

const history = createMemoryHistory();

describe('component Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
    expect(screen.getByText('Поиск')).toBeInTheDocument();
  });
});
