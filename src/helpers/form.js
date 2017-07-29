import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import { database, storage } from './firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';


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

export function generateKey () {
  return firebase.database().ref().push().key();
}

export function addChildProfile (formData) {
  database.ref(`guardians/${formData.gid}/children`)
          .push(formData).key();
}

// FILE UPLOAD
// 
// transform the file to blob/base64 data the file is uploaded
// 
export function handleFileUpload(uri, selectedImage, storageRef, userRef, mime = 'image/jpeg') {

  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null

    const imageRef = storageRef.child(selectedImage.filename);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        userRef.update({
          profileImage: url
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
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