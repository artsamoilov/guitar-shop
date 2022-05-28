import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import ProductTabs from './product-tabs';
import {getMockGuitars} from '../../mocks/mocks';

const mockStore = configureMockStore();

const guitar = getMockGuitars()[0];

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
});

const history = createMemoryHistory();

describe('component ProductTabs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductTabs guitar={guitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип:/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн:/i)).toBeInTheDocument();
    expect(screen.getByText(guitar.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(`${guitar.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText(guitar.description)).toBeInTheDocument();
  });
});
