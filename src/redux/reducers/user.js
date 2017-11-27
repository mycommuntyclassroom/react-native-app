import initialState from '../../initial-state.js';

export default function userReducer(state = initialState.auth, action) {
  switch(action.type) {
    case 'NEW_ACCOUNT_CREATED':
      return {
        status: 'NEW_ACCOUNT_CREATED',
        ...action.formData
      };
    case 'LOGGED_IN':
      return {
        ...action.userData
      };
    case 'CHILD_ACCOUNT_SET':
      return {
        status: 'CHILD_ACCOUNT_SET',
        ...action.formData
      };
    case 'FRIEND_ADDED':
      return {
        status: 'FRIEND_ADDED',
        ...action.friendObj
      };
    case 'FRIEND_REQUEST':
      return {
        status: 'FRIEND_REQUEST',
        ...action.pendingRequests
      };
    case 'UPDATED_EVENTS_LIST':
      return {
        ...action.hostEvents
      };
    default:
      return state;
  }
}
