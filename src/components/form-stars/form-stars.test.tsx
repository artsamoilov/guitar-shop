import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import FormStars from './form-stars';
import {MutableRefObject} from 'react';

const mockStore = configureMockStore();

const store = mockStore({
  MODAL: {
    isAddToCartModalOpened: false,
    isAddReviewModalOpened: false,
    isReviewSuccessOpened: false,
  },
});

const history = createMemoryHistory();

describe('component Footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormStars
            isRatingCorrect={false}
            handleFieldChange={() => undefined}
            starsRef={{current: {}} as MutableRefObject<HTMLDivElement | null>}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTitle(/Отлично/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Хорошо/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Нормально/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Плохо/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Ужасно/i)).toBeInTheDocument();
  });
});
