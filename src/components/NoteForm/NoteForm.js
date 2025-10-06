import React, { useState } from "react";
import styles from "./NoteForm.module.css";

export default function NoteForm({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({ title: "", content: "" });

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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setErrors({ title: "", content: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddNote({ title, content });
      setTitle("");
      setContent("");
      setIsExpanded(false);
      setErrors({ title: "", content: "" });
    }
  };

  return (
    <div className={styles.noteFormContainer}>
      <button
        className={styles.toggleBtn}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls="note-form"
      >
        {isExpanded ? "Hide Form" : "Add Note"}
      </button>

      {isExpanded && (
        <form
          id="note-form"
          className={styles.noteForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
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
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              className={`${styles.textarea} ${
                errors.content ? styles.inputError : ""
              }`}
            />
            {errors.content && (
              <span className={styles.errorMessage}>{errors.content}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add
          </button>
        </form>
      )}
    </div>
  );
}
