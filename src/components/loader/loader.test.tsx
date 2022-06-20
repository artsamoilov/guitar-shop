import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import Loader from './loader';

const mockStore = configureMockStore();

const store = mockStore({});

const history = createMemoryHistory();

describe('component CatalogFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Loader />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument();
  });
});
