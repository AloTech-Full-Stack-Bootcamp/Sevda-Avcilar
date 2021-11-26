import React, { useState } from "react";

function TodoElement({ removetodo, checkeditem, categoryElement, editTodo }) {
  //Getting category from TodoList to show filtered items
  const category = categoryElement();
  //State for editing section; if its false, it opens the input bar
  const [level, setLevel] = useState(false);
  //State for edited text
  const [edit, setEdit] = useState("");

  return category.map((todo, index) => (
    <li key={index} className={todo.isCompleted ? "completed" : ""}>
      {/* className="completed" is for showing that todo has been completed*/}
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.isCompleted ? true : false}
          onChange={(e) => {
            checkeditem(todo.id, e.target.checked);
          }}
        />
        <label onClick={() => setLevel(true)}>
          {level ? (
            <form
              onSubmit={() => {
                editTodo(edit, todo.id);
                setLevel(false);
              }}
            >
              <input
                type="text"
                id={todo.id}
                value={edit}
                onChange={(e) => {
                  setEdit(e.target.value);
                }}
              />
            </form>
          ) : (
            todo.text
          )}
        </label>
        <button
          className="destroy"
          onClick={() => removetodo(todo.id)}
        ></button>
      </div>
    </li>
  ));
}

export default TodoElement;
