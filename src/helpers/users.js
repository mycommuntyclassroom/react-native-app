import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

let ref = null;

const setUsers = snapshot => {
  const users = snapshot.val() || {};
  store.dispatch(
    actions.setUsers(users)
  );
};

const Users = {};

Users.once = callback => {
  Firebase.once('users', snapshot => {
    setUsers(snapshot);
    callback(snapshot);
  });
};

Users.sync = callback => {
  ref = Firebase.on('users', snapshot => {
    setUsers(snapshot);
    callback(snapshot);
  });
};

Users.cancel = () => {
  Firebase.off(ref, setUsers);
  store.dispatch(
    actions.setUsers({})
  );
};

export default Users;
