import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import ModalCartDelete from './modal-cart-delete';
import {getMockGuitars} from '../../mocks/mocks';

const mockStore = configureMockStore();

const fakeGuitar = getMockGuitars()[0];

const store = mockStore({
  MODAL: {
    isCartDeleteModalOpened: true,
  },
  CART: {
    deletingGuitar: fakeGuitar,
  },
});

const history = createMemoryHistory();

describe('component ModalCartDelete', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalCartDelete />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText('Удалить товар')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});
