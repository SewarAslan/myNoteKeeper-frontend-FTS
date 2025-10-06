import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note, onUpdateNote }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [errors, setErrors] = useState({ title: "", content: "" });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setTitle(note.title);
    setContent(note.content);
    setErrors({ title: "", content: "" });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setErrors({ title: "", content: "" });
  };

  const validateForm = () => {
    const newErrors = { title: "", content: "" };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "This field is required";
      isValid = false;
    }
    if (!content.trim()) {
      newErrors.content = "This field is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateNote(note._id, { title, content });
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div className={styles.noteCard}>
        <h3 className={styles.title}>{note.title}</h3>
        <p className={styles.content}>{note.content}</p>

        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={handleOpenDialog}
            aria-label={`Edit note ${note.title}`}
          >
            Edit
          </button>
        </div>
      </div>

      {isDialogOpen &&
        createPortal(
          <div className={styles.dialogOverlay} onClick={handleCloseDialog}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.dialogTitle}>Edit Note</h2>
              <form className={styles.dialogForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="edit-title">Title</label>
                  <input
                    type="text"
                    id="edit-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    className={`${styles.input} ${
                      errors.title ? styles.inputError : ""
                    }`}
                  />
                  {errors.title && (
                    <span className={styles.errorMessage}>{errors.title}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="edit-content">Content</label>
                  <textarea
                    id="edit-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter note content"
                    className={`${styles.textarea} ${
                      errors.content ? styles.inputError : ""
                    }`}
                  />
                  {errors.content && (
                    <span className={styles.errorMessage}>
                      {errors.content}
                    </span>
                  )}
                </div>

                <div className={styles.dialogActions}>
                  <button type="submit" className={styles.submitBtn}>
                    Save
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
