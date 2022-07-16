import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import ModalAddToCart from './modal-add-to-cart';
import {getMockGuitars} from '../../mocks/mocks';
import {getSeparatedPrice} from '../../utils';

const mockStore = configureMockStore();

const fakeGuitar = getMockGuitars()[0];

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: true,
  },
});

const history = createMemoryHistory();

describe('component ModalAddToCart', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddToCart guitar={fakeGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeGuitar.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${getSeparatedPrice(fakeGuitar.price)} ₽`)).toBeInTheDocument();
  });
});
