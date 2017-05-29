/*
 * action types
 */

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_USER = 'SET_USER';
export const SET_USERS = 'SET_USERS';

/*
 * action creators
 */

export function logIn() {
  return {
    type: LOG_IN
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}
