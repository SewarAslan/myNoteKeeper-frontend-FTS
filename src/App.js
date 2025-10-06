import React, { useState, useEffect } from "react";
import "./App.css";
import NotesList from "./components/NotesList/NotesList";
import NoteForm from "./components/NoteForm/NoteForm";
import { getAllNotes, createNote, updateNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const fetchedNotes = await getAllNotes();
        setNotes(fetchedNotes);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);
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
  return (
    <div className="App">
      <h1>Note Keeper</h1>
      <NoteForm onAddNote={handleAddNote} />
      <div className="notesContainer">
        <NotesList
          notes={notes}
          isLoading={isLoading}
          error={error}
          onUpdateNote={handleUpdateNote}
        />
      </div>
    </div>
  );
}

export default App;
