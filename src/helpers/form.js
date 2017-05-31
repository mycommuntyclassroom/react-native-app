import { database } from './firebase';

export function updateProfile (formData) {
  console.log('updateProfile', formData);
  database.ref('guardians')
          .child(formData.uid)
          .update(formData);
}

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
