import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationsReducer from './notifications';
import userReducer from './user';
import eventsReducer from './events';


const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  user: userReducer,
  events: eventsReducer
});

export default rootReducer;
