import firebase from 'firebase';

export default {
  upload: (file, path) => {
    // Maybe create a new method in the firebase helper to make this easier..
    return firebase.storage().ref(path).put(file);
  }
}
