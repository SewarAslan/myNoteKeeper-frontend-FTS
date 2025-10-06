import React from "react";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.noteCard}>
      <div className={styles.noteHeader}>
        <h3 className={styles.noteTitle}>{note.title}</h3>
        <button className={styles.deleteBtn}>🗑️</button>
      </div>
      <p className={styles.noteContent}>{note.content.substring(0, 100)}...</p>
      <span className={styles.noteDate}>{formatDate(note.creationDate)}</span>
    </div>
  );
}
