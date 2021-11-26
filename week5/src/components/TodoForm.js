import React, { useState } from "react";

function TodoForm(props) {
  //State of input todo
  const [input, setInput] = useState("");

  //Handling Change on input
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //Handling submit on input
  const handleSubmit = (e) => {
    e.preventDefault();
    //Submiting todo element with these prototypes
    props.onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: input,
      isCompleted: false,
    });

    //Setting input area with empty string
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={input}
        onChange={handleChange}
      />
    </form>
  );
}

export default TodoForm;
