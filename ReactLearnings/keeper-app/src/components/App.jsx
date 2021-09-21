import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [Notes, setNotes] = React.useState([]);

  function addNotes(note) {
    setNotes((prevValue) => [...prevValue, note]);
  }

  function deleteNote(id) {
    setNotes((prevValue) => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNotes={addNotes} />
      {Notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          delete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
