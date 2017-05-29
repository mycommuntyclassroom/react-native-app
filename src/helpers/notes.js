import Rx from 'rx-dom';
import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

let ref = null;

const setNotes = snapshot => {
  const notes = snapshot.val() || {};
  store.dispatch(
    actions.setNotes(notes)
  );
};

const Notes = {};

Notes.once = callback => {
  Firebase.once('notes', snapshot => {
    setNotes(snapshot);
    callback(snapshot);
  });
};

Notes.sync = callback => {
  ref = Firebase.on('notes', snapshot => {
    setNotes(snapshot);
    callback(snapshot);
  });
};

Notes.cancel = () => {
  Firebase.off(ref, setNotes);
  store.dispatch(
    actions.setNotes({})
  );
};

Notes.filterNotesByQuery = (notes, query) => {
  // prevent unneccessary filtering when there is not search query
  if (query.length === 0) {
    return notes;
  }

  let filteredNotes = {};
  Rx.Observable.from(Object.keys(notes))
    .map(noteId => ({ noteId, ...notes[noteId] }))
    .filter(item => {
      let matchFound = false;
      ['title', 'content'].forEach(prop => {
        if (matchFound) return;
        if (item[prop])
          matchFound = item[prop].toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
      return matchFound;
    })
    .subscribe(
      item => {
        const { noteId } = item;
        filteredNotes[noteId] = notes[noteId]
      }
    );

  return filteredNotes;
};

export default Notes;
