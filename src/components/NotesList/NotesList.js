import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import styles from "./NotesList.module.css";

const mockNotes = [
  {
    _id: "1",
    title: "Note Title 1",
    content:
      "This is the content of the first note as an example. It could be longer, but we’ll keep it short.",
    creationDate: "2025-10-06T10:30:00Z",
  },
  {
    _id: "2",
    title: "Note Title 2",
    content:
      "Content of the second note goes here. Another example for display.",
    creationDate: "2025-10-05T14:20:00Z",
  },
  {
    _id: "3",
    title: "Note Title 3",
    content:
      "Content of the third note. Used to test displaying multiple cards.",
    creationDate: "2025-10-04T09:15:00Z",
  },
];

export default function NotesList() {
  return (
    <div className={styles.notesList}>
      {mockNotes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
}
