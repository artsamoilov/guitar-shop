import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {getMockComments} from '../../mocks/mocks';
import ProductReviews from './product-reviews';

const mockStore = configureMockStore();

const fakeComments = getMockComments(1);

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
  DATA: {
    comments: fakeComments,
  },
});

const history = createMemoryHistory();

describe('component ProductReviews', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductReviews />
        </HistoryRouter>
      </Provider>
    );

    const userNames = screen.getAllByText(fakeComments[0].userName);
    const advantages = screen.getAllByText(fakeComments[0].userName);
    const disadvantages = screen.getAllByText(fakeComments[0].userName);
    const comments = screen.getAllByText(fakeComments[0].userName);

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(userNames[0]).toBeInTheDocument();
    expect(advantages[0]).toBeInTheDocument();
    expect(disadvantages[0]).toBeInTheDocument();
    expect(comments[0]).toBeInTheDocument();
    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Показать еще отзывы/i)).toBeInTheDocument();
    expect(screen.getByText(/Наверх/i)).toBeInTheDocument();
  });
});
