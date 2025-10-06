import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./NoteCard.module.css";

export default function NoteCard({ note, onUpdateNote, onDeleteNote }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [errors, setErrors] = useState({ title: "", content: "" });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDeleteNote(note._id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className={styles.noteCard}>
        <button
          className={styles.deleteBtn}
          onClick={handleOpenDeleteDialog}
          aria-label={`Delete note ${note.title}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>

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

      {isDeleteDialogOpen &&
        createPortal(
          <div
            className={styles.dialogOverlay}
            onClick={handleCloseDeleteDialog}
          >
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
              <h2 className={styles.dialogTitle}>Confirm Delete</h2>
              <p className={styles.deleteMessage}>
                Are you sure you want to delete the note "{note.title}"?
              </p>
              <div className={styles.dialogActions}>
                <button
                  className={styles.deleteConfirmBtn}
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={handleCloseDeleteDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
