import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {getMockComments} from '../../mocks/mocks';
import Review from './review';

const fakeComment = getMockComments(1)[0];

describe('component Review', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Review comment={fakeComment}/>
      </HistoryRouter>
    );

    expect(screen.getByText(fakeComment.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
  });
});
