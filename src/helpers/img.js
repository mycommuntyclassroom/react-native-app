import firebase from '../fixtures/firebase';
const { storageBucket } = firebase;

// This helper uses an image filename as a key
// to get the Firebase Cloud Storage download url
const img = filename => {
  filename = encodeURIComponent(filename);
  let path = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${filename}?alt=media`;
  if (process.env.OFFLINE) {
    path = `http://localhost:1234/${filename}`;
  }
  return path;
};
export default img;
