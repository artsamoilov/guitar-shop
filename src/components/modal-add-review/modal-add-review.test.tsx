import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {getMockGuitars} from '../../mocks/mocks';
import ModalAddReview from './modal-add-review';

const mockStore = configureMockStore();

const fakeGuitar = getMockGuitars()[0];

const store = mockStore({
  MODAL: {
    isAddReviewModalOpened: true,
  },
});

const history = createMemoryHistory();

describe('component ModalAddReview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalAddReview guitar={fakeGuitar} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Ваша Оценка/i)).toBeInTheDocument();
    expect(screen.getByText(/Достоинства/i)).toBeInTheDocument();
    expect(screen.getByText(/Недостатки/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
  });
});
