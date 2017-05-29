import { createStore } from 'redux';
import rootReducer from './reducers';

// Enable Redux dev tools in dev only
let storeByEnvironment = null;
if (process.env.NODE_ENV === 'production') {
  storeByEnvironment = createStore(rootReducer);
} else {
  storeByEnvironment =
    createStore(rootReducer,
      window.devToolsExtension &&
      window.devToolsExtension());
}
const store = storeByEnvironment;
export default store;
