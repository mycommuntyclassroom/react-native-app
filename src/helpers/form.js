import { database } from './firebase';

export function updateProfile (path, formData) {
  console.log('updateProfile', formData);
  console.log('updateProfile PATH', path);
  database.ref(path)
          .update(formData);
}

export function removeItem (path) {
  database.ref(path)
          .remove()
}

export function addItem (path, formData) {
  console.log('addItem', formData);
  database.ref(path)
          .push(formData);
}

export function addChildProfile (formData) {
  console.log('addChildProfile data: ', formData);
  database.ref(`guardians/${formData.gid}/children`)
          .push(formData);
}

// TODO: replace the bottom methods with the above methods throughout the app

export function updateChildProfile (formData) {
  console.log('updateChildProfile data: ', formData);
  database.ref(`guardians/${formData.gid}/children`)
          .push(formData);
}

export function updateHostProfile (formData) {
  console.log('updateHostProfile data: ', formData);
  database.ref(`guardians/${formData.gid}/hostEvents`)
          .push(formData);
}

export function updateHostEventsTable (formData) {
  console.log('updateHostProfile data: ', formData);
  database.ref(`hostEvents/${formData.gid}`)
          .push(formData);
}
