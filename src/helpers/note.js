import Firebase from './firebase';

const Note = {};

Note.save = (note, router) => {
  let { noteId, author } = note;
  note.timestamp = (new Date()).getTime();
  if (!noteId) return;

  // Not putting files into our database lol
  delete note.upload;

  // Add note
  if (noteId === 'add') {
    delete note.noteId;
    const noteRef = Firebase.ref('notes').push();
    noteId = noteRef.getKey();
    noteRef.set(note, err => {
      // Set noteId
      Firebase.set(`notes/${noteId}/noteId`, noteId, err => {
        // Add note to user
        Firebase.set(`users/${author}/notes/${noteId}`, true);
      });
    });
  }

  // Update note
  else Firebase.set(`notes/${noteId}`, note);

  // Redirect to note view
  router.push(`/note/${noteId}`);
};

Note.delete = note => {
  const decision = confirm('Are you sure you want to delete this note?');
  if (decision) {
    const { noteId, author } = note;

    // Delete note
    Firebase.set(`notes/${noteId}`, null, err => {
      // Delete note from user
      Firebase.set(`users/${author}/notes/${noteId}`, null);
    });
  }
};

export default Note;
