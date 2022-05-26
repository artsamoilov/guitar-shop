import {render, screen} from '@testing-library/react';
import App from './app';
//
// test('Renders app-component', () => {
//   render(<App />);
//   const textElement = screen.getByText(/Hello, world!/i);
//   expect(textElement).toBeInTheDocument();
// });

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
        </HistoryRouter>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });
});
