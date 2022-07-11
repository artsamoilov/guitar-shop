import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import App from './app';
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
  CART: {
    guitars: fakeGuitars,
    deletingGuitar: fakeGuitars[0],
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

describe('app routing',() => {
  it('should render CatalogPage when user navigate to "/catalog/page_1"', () => {
    history.push(`${AppRoute.Catalog}/page_1`);

    render(fakeApp);

    const guitarNames = screen.getAllByText(fakeGuitars[0].name);

    expect(guitarNames[0]).toBeInTheDocument();
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });

  it('should render ProductPage when user navigate to "/catalog/item/:id"', () => {
    history.push(`${AppRoute.Catalog}/item/${fakeGuitars[0].id}`);

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

  it('should render CartPage when user navigate to "/catalog/cart"', () => {
    history.push(AppRoute.Cart);

    render(fakeApp);

    const cartHeadings = screen.getAllByText(/Корзина/i);

    expect(cartHeadings[0]).toBeInTheDocument();
    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });

  it('should render NotFoundPage when user navigate to unknown route', () => {
    history.push('/unknown');

    render(fakeApp);

    expect(screen.getByText(/404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге./i)).toBeInTheDocument();
  });
});
