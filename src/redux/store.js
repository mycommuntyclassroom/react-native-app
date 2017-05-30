import rootReducer from './reducers';
import initialState from '../initial-state';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

const middleware = [ thunk ];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Enable Redux dev tools in dev only
let storeByEnvironment = null;
if (process.env.NODE_ENV === 'production') {
  storeByEnvironment = createStore(
    rootReducer, 
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
} else {
  storeByEnvironment =
    createStore(
      rootReducer,
      initialState,
      composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers
      )
  )
}

const store = storeByEnvironment;

export default store;
