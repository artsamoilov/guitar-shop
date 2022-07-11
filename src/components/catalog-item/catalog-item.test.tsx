import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import CatalogItem from './catalog-item';
import {getMockGuitars} from '../../mocks/mocks';
import React from 'react';

const fakeGuitar = getMockGuitars()[0];

const mockStore = configureMockStore();

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
  CART: {
    guitars: [],
  },
});

const history = createMemoryHistory();

describe('component CatalogItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogItem guitar={fakeGuitar} setCurrentGuitar={() => undefined}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Рейтинг:/i)).toBeInTheDocument();
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.comments.length)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.price} ₽`)).toBeInTheDocument();
  });
});
