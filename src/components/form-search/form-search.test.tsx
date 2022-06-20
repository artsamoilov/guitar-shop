import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import FormSearch from './form-search';
import {getMockGuitars} from '../../mocks/mocks';

const mockStore = configureMockStore();

const fakeGuitars = getMockGuitars();

const store = mockStore({
  DATA: {
    guitars: fakeGuitars,
  },
});

const history = createMemoryHistory();

describe('component CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FormSearch />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить поиск/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
  });
});
