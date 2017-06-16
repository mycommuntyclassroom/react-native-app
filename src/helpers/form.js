import { database } from './firebase';

export function updateProfile (path, formData) {
  database.ref(path)
          .update(formData);
}

export function removeItem (path) {
  database.ref(path)
          .remove()
}

export function addItem (path, formData) {
  database.ref(path)
          .push(formData);
}

export function addChildProfile (formData) {
  database.ref(`guardians/${formData.gid}/children`)
          .push(formData);
}

// TODO: replace the bottom methods with the above methods throughout the app

export function updateChildProfile (formData) {
  database.ref(`guardians/${formData.gid}/children`)
          .push(formData);
}

export function updateHostProfile (formData) {
  database.ref(`guardians/${formData.gid}/hostEvents`)
          .push(formData);
}

export function updateHostEventsTable (formData) {
  database.ref(`hostEvents/${formData.gid}`)
          .push(formData);
}

export function capitalizeWord (str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}