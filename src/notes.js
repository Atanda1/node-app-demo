import { insertDB, getDB } from "./db";

export const newNote = async (notEqual, tags) => { 
    const newNote = {
        content: note,
        id: Date.now(),
        tags,
    };
    await insertDB(newNote);
    console.log(newNote);
}

export const getAllNotes = () => {
    const db = getDB();
    console.log(db.notes);
}

export const findNotes = async (filter) => {
    const { notes } = await getDB();
    return notes.filter((note) => note.content.toLowerCase().includes(filter));
}