import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  createNote,
  getNotes,
  removeNote,
  removeAllNotes,
  findNotes,
} from "./notes.js";
import { get } from "node:https";
import { start } from "./server.js";

const listNotes = (notes) => {
  console.log(notes);

  notes.forEach((note) => {
    console.log("\n");
    console.log("id: ", note.id);
    console.log("tags: ", note.tags.join(", ")),
      console.log("note: ", note.content);
  });
};

yargs(hideBin(process.argv))
  .command(
    "curl <url>",
    "fetch the contents of the URL",
    () => {},
    (argv) => {
      console.info(argv);
    }
  )
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = getNotes();
      console.log(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      if (id) {
        console.log(`Note with id ${id} removed`);
      } else {
        console.log(`Note with id ${id} not found`);
      }
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => {
      const notes = await getNotes();
      start(notes, argv.port);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {}
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })

  .command(
    "new <note>",
    "Create a new note",
    (yargs) =>
      yargs.positional("note", {
        describe: "The note to add",
        type: "string",
      }),
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await createNote(argv.note, tags);
      console.log("Note created", note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .demandCommand(1)
  .parse();
