import actions from '../actions';
import User from '../../helpers/user';

const {
  LOG_IN,
  LOG_OUT,
  SET_USER,
  SET_USERS
} = actions;

/*
 * Reducers
 */

export function user(state = null, action) {
  switch (action.type) {

  case LOG_IN:
    User.logIn();
    return state;

  case LOG_OUT:
    User.logOut();
    return null;

  case SET_USER:
    return action.user;

  default:
    return state;
  }
}

export function users(state = {}, action) {
  switch (action.type) {

  case SET_USERS:
    return action.users;

  default:
    return state;
  }
}
