import initialState from '../../initial-state.js';

export default function notificationsReducer(state = initialState.auth, action) {
  switch(action.type) {
    case 'NOTIFICATIONS_ALERT':
      return {
        ...action.notifications
      };
    default:
      return state;
  }
}
