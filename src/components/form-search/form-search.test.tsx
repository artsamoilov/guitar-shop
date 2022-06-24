import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import FormSearch from './form-search';
import {getMockGuitars} from '../../mocks/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const fakeGuitars = getMockGuitars();

const store = mockStore({
  DATA: {
    guitars: fakeGuitars[0],
    isDataLoaded: true,
    guitarsSearchList: [],
    isSearchListLoaded: true,
  },
});

const history = createMemoryHistory();

describe('component FormSearch', () => {
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
    expect(screen.getByText(/Ничего не найдено/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
  });
});
