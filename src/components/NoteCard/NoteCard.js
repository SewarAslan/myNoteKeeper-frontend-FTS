import styles from "./NoteCard.module.css";

export default function NoteCard() {
  const note = {
    _id: "1",
    title: "Sample Note Title",
    content:
      "This is a sample note content that demonstrates how the note card will look. It can be quite long but we will truncate it in the card view.",
    creationDate: "2025-01-15T10:30:00Z",
  };

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
      <p className={styles.noteContent}>{note.content}</p>
      <span className={styles.noteDate}>{formatDate(note.creationDate)}</span>
    </div>
  );
}
