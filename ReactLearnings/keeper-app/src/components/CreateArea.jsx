import React from "react";

function CreateArea(props) {
  const [note, setNote] = React.useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function onSubmit(event) {
    props.addNotes(note);
    event.preventDefault();
    setNote({ title: "", content: "" });
  }
  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button onClick={onSubmit}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
