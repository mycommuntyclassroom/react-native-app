import { combineReducers } from 'redux';
import * as dataReducers from './data';

const rootReducer = combineReducers({
  ...dataReducers,
});

export default rootReducer;
