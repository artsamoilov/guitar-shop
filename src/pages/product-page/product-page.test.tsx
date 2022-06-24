import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import App from '../../components/app/app';
import {getMockGuitars, getMockComments} from '../../mocks/mocks';
import {AppRoute} from '../../const';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

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

describe('component ProductPage',() => {
  beforeEach(() => {
    history.push(`${AppRoute.Catalog}/item/${fakeGuitars[0].id}`);
  });

  it('should render correctly', () => {
    render(fakeApp);

    const guitarNames = screen.getAllByText(fakeGuitars[0].name);
    const priceHeadings = screen.getAllByText(/Цена/i);
    const prices = screen.getAllByText(`${fakeGuitars[0].price} ₽`);
    const reviewHeadings = screen.getAllByText(/Отзывы/i);

    expect(guitarNames[0]).toBeInTheDocument();
    expect(priceHeadings[0]).toBeInTheDocument();
    expect(prices[0]).toBeInTheDocument();
    expect(reviewHeadings[0]).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });
});
