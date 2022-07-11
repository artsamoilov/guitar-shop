import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {getMockGuitars} from '../../mocks/mocks';
import React from 'react';
import CartItem from './cart-item';

const mockStore = configureMockStore();

const fakeGuitar = getMockGuitars()[0];

const store = mockStore({
  CART: {
    cartGuitars: [fakeGuitar],
  },
});

const history = createMemoryHistory();

describe('component CartItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CartItem guitar={fakeGuitar}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Артикул:/i)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
  });
});
