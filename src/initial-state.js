const initialState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    displayName: undefined,
    photoURL: null,
    uid: null,
    isMember: false
  },
  notifications: {
    seen: 'loading'
  }
};

export default initialState;
