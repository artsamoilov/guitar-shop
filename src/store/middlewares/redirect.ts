import {browserHistory} from '../../browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === 'app/redirect') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export {redirect};
