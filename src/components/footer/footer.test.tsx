import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

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
          <Footer />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
    expect(screen.getByText(/в Санкт-Петербурге/i)).toBeInTheDocument();
    expect(screen.getByText(/Все инструменты проверены, отстроены/i)).toBeInTheDocument();
    expect(screen.getByText(/и доведены до идеала!/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Вопрос - ответ/i)).toBeInTheDocument();
    expect(screen.getByText(/Возврат/i)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/Невский проспект/i)).toBeInTheDocument();
    expect(screen.getByText(/Казанская 6/i)).toBeInTheDocument();
    expect(screen.getByText(/8-812-500-50-50/i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы/i)).toBeInTheDocument();
    expect(screen.getByText(/с 11:00 до 20:00/i)).toBeInTheDocument();
    expect(screen.getByText(/без выходных/i)).toBeInTheDocument();
  });
});
