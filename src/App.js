import React, { useState, useEffect } from "react";
import "./App.css";
import NotesList from "./components/NotesList/NotesList";
import NoteForm from "./components/NoteForm/NoteForm";
import { createNote, updateNote, deleteNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNotes = async (query = "") => {
    setIsLoading(true);
    try {
      const url = query
        ? `/notes/search?query=${encodeURIComponent(query)}`
        : "/notes";
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch notes: ${response.status}`
        );
      }
      const data = await response.json();
      const notesArray = query ? data : data.notes;
      setNotes(notesArray);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchNotes(searchQuery);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleAddNote = async (note) => {
    try {
      const newNote = await createNote(note);
      setNotes([newNote, ...notes]);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const updated = await updateNote(id, updatedNote);
      setNotes(notes.map((note) => (note._id === id ? updated : note)));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Note Keeper</h1>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search between Notes ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
      </div>
      <NoteForm onAddNote={handleAddNote} />
      <div className="notesContainer">
        <NotesList
          notes={notes}
          isLoading={isLoading}
          error={error}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  );
}

export default App;
