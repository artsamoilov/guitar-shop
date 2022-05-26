import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import ModalSuccessReview from './modal-success-review';

const mockStore = configureMockStore();

const store = mockStore({
  MODAL: {
    isReviewSuccessOpened: true,
  },
});

const history = createMemoryHistory();

describe('component ModalSuccessReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalSuccessReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за ваш отзыв!/i)).toBeInTheDocument();
    expect(screen.getByText(/К покупкам!/i)).toBeInTheDocument();
  });
});
