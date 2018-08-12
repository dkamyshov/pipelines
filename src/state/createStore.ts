import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';

const rawCreateStore = () => {
  const composeEnhancers =
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunk));

  return reduxCreateStore(reducer, enhancer);
};

export const createStore = () => {
  if (process.env.NODE_ENV === 'production') {
    return rawCreateStore();
  } else {
    if (!(window as any).__DEV_STORE__) {
      (window as any).__DEV_STORE__ = rawCreateStore();
    }

    if ((module as any).hot) {
      (module as any).hot.accept('./reducers', () => {
        const newReducer = require('./reducers');
        (window as any).__DEV_STORE__.replaceReducer(newReducer.reducer);
      });
    }

    return (window as any).__DEV_STORE__;
  }
};
