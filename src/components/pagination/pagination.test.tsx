import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {getMockGuitars} from '../../mocks/mocks';
import Pagination from './pagination';

const mockStore = configureMockStore();

const fakeGuitars = getMockGuitars();

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
  DATA: {
    guitars: fakeGuitars,
  },
});

const history = createMemoryHistory();

describe('component Pagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Pagination page={2} setPage={() => undefined} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(Math.ceil(fakeGuitars.length / 9))).toBeInTheDocument();
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
