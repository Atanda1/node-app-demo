import { match } from "assert";
import { insertDB, getDB, saveDB } from "./db.js";

export const createNote = async (note, tags) => {
  const newNote = {
    content: note,
    id: Date.now(),
    tags,
  };
  const result = await insertDB(newNote);
  console.log(result);
  return newNote;
};

export const getNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) =>
    note.id.toString().toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getNotes();

  const match = notes.find((note) => note.id == id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    console.log("Note removed");
    return id;
  }
};

export const removeAllNotes = () => saveDB({ notes: [] });
