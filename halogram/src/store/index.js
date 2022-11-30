import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import state from './state';

const reduxLogger = createLogger({
  predicate: () => window.location.host.includes('localhost'),
});


const store = createStore(
  reducers,
  state,
  applyMiddleware(thunk, reduxLogger)
);

export default store;
