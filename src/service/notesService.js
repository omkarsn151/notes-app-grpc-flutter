import Note from "../models/notesModel.js";

export const addNote = async ({ title, content }) => {
  const note = new Note({ title, content });
  return await note.save();
};

export const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

export const getAllNotes = async () => {
  return await Note.find();
};

export const editNote = async ({ id, title, content }) => {
  return await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true } 
  );
};
