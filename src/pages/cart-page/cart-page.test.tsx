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

describe('component CartPage',() => {
  beforeEach(() => {
    history.push(AppRoute.Cart);
  });

  it('should render correctly', () => {
    render(fakeApp);

    const cartHeadings = screen.getAllByText(/Корзина/i);

    expect(cartHeadings[0]).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });
});
