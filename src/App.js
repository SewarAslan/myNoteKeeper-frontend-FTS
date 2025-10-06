import "./App.css";
import NoteCard from "./components/NoteCard/NoteCard";

function App() {
  return (
    <div className="App">
      <h1>Note Keeper</h1>
      <div className="notesContainer">
        <NoteCard />
      </div>
    </div>
  );
}

export default App;
