// const add = (num, num2) => num + num2;

// test("add takes two numbers and returns a sum", () => {
//   const result = add(1, 2)

//   expect(result).toBe(3)
// });

import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

// Use dynamic import to load the mocked module
let insertDB, getDB, saveDB;
let createNote, removeNote;

beforeEach(async () => {
  // Dynamically import the mocked modules and functions
  ({ insertDB, getDB, saveDB } = await import("../src/db.js"));
  ({ createNote, removeNote, getNotes } = await import("../src/notes"));

  // Clear mocks before each test
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const newNote = {
    content: "this is my note",
    id: 1,
    tags: ["hello"],
  };

  insertDB.mockResolvedValue(newNote);

  const result = await createNote(newNote.content, newNote.tags);

  expect(result.content).toEqual(newNote.content);
  //   expect(result.id).toEqual(newNote.id);
});

// test("getAllNotes returns all notes", async () => {
//   const db = {
//     notes: ["note1", "note2", "note3"],
//   };
//   getDB.mockResolvedValue(db);

//   const result = await getNotes();
//   expect(result).toEqual(db.notes);
// });

test("removeNote does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
    
    getDB.mockResolvedValue({ notes });
  saveDB.mockResolvedValue(notes);

  const idToRemove = 8;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});

// test("remove notes and does nothing if id is not found", async () => {
//   const notes = [
//     { id: 1, content: "note 1", tags: [] },
//     { id: 2, content: "note 2", tags: [] },
//     { id: 3, content: "note 3", tags: ["hello"] },
//   ];

//   saveDB.mockResolvedValue(notes);

//   const idToRemove = 8;
//   const result = await removeNote(idToRemove);
//   expect(result).toBeUndefined();
// });
