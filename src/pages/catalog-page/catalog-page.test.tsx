import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import App from '../../components/app/app';
import {getMockGuitars, getMockComments} from '../../mocks/mocks';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();

const fakeGuitars = getMockGuitars();
const fakeComments = getMockComments(1);

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
    comments: fakeComments,
    isCommentsListLoading: false,
    isCommentsListLoaded: true,
    guitarsSearchList: [fakeGuitars[0]],
    isSearchListLoaded: true,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('component CatalogPage',() => {
  beforeEach(() => {
    history.push(`${AppRoute.Catalog}/page_1`);
  });

  it('should render correctly', () => {
    render(fakeApp);

    const guitarNames = screen.getAllByText(fakeGuitars[0].name);

    expect(guitarNames[0]).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });
});
