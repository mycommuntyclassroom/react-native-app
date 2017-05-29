import actions from '../actions';

const { DATA_READY } = actions;

/*
 * Reducers
 */

export function dataReady(state = false, action) {
  switch (action.type) {

  case DATA_READY:
    return true;

  default:
    return state;
  }
}
