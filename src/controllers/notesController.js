import { addNote, deleteNote, getAllNotes, editNote } from "../service/notesService.js";

const NoteService = {
  AddNote: async (call, callback) => {
    try {
      const note = await addNote(call.request);
      callback(null, {
        note: {
          id: note._id.toString(),
          title: note.title,
          content: note.content,
        },
      });
    } catch (error) {
      callback(error);
    }
  },

  DeleteNote: async (call, callback) => {
    try {
      const result = await deleteNote(call.request.id);
      if (!result) {
        return callback(new Error("Note not found"));
      }
      callback(null, { message: "Note deleted successfully" });
    } catch (error) {
      callback(error);
    }
  },


  GetAllNotes: async (call, callback) => {
    try {
      const notes = await getAllNotes();
      const response = {
        notes: notes.map(note => ({
          id: note._id.toString(),
          title: note.title,
          content: note.content
        }))
      };
      callback(null, response);
    } catch (error) {
      callback(error);
    }
  },

  EditNote: async (call, callback) => {
    try {
      const updatedNote = await editNote(call.request);
      if (!updatedNote) {
        return callback(new Error("Note not found"));
      }
      callback(null, {
        note: {
          id: updatedNote._id.toString(),
          title: updatedNote.title,
          content: updatedNote.content,
        }
      });
    } catch (error) {
      callback(error);
    }
  }
};

export default NoteService;
