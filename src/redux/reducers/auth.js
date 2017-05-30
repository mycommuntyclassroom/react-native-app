import initialState from '../../initial-state.js';

export default function authReducer(state = initialState.auth, action) {
  switch(action.type) {
    case 'ATTEMPTING_LOGIN':
      return {
        status: 'AWAITING_AUTH_RESPONSE'
      };
    case 'SIGN_OUT':
      return {
        status: 'ANONYMOUS',
        email: null,
        displayName: null,
        photoURL: null,
        uid: null
      };
    case 'CREATING_ACCOUNT':
      return {
        status: 'CREATING_ACCOUNT',
        uid: action.user.uid,
        email: action.user.email,
        displayName: action.user.displayName,
        photoURL: action.user.photoURL
      };
    case 'NEW_ACCOUNT_CREATED':
      console.log('newAccountCreated in AUTH REDUCER CALLED');
      return {
        status: 'NEW_ACCOUNT_CREATED',
        uid: action.formData.uid,
        email: action.formData.email,
        displayName: action.formData.displayName,
        photoURL: action.formData.photoURL,
        isMember: true
      }
    case 'SIGN_IN':
      return {
        status: 'SIGNED_IN',
        email: action.user.email,
        displayName: action.user.displayName,
        photoURL: action.user.photoURL,
        uid: action.user.uid
      };
    case 'SET_AS_ADMIN':
      return Object.assign({}, state, { isAdmin: true });
    default:
      return state;
  }
}
