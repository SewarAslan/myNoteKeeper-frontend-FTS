import React from "react";
import NoteCard from "../NoteCard/NoteCard";
import styles from "./NotesList.module.css";

export default function NotesList({ notes, isLoading, error, onUpdateNote }) {
  if (isLoading) {
    return <div className={styles.loading}>Loading notes...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  if (!notes || notes.length === 0) {
    return <div className={styles.empty}>No notes to display</div>;
  }

  return (
    <div className={styles.notesList}>
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onUpdateNote={onUpdateNote} />
      ))}
    </div>
  );
}
