import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoElement from "./TodoElement";

function TodoList() {
  //State of todo list
  const [todos, setTodos] = useState([]);
  //State for making all todo's true or false
  const [allMarked, setallMarked] = useState(true);
  //State for categories
  const [activeCategory, setactiveCategory] = useState("all");

  //Adding a todo element to todo list
  const addtodo = (todo) => {
    //Checking if input is empty; if it's empty, it returns
    if (!todo.text && todo.text < 1) return;
    const newList = [todo, ...todos];
    setTodos(newList);
  };

  //Removing a todo element from todo list
  const removetodo = (id) => {
    const newList = [...todos];
    //Finding element with id parameter in todo list
    const removeIndex = newList.map((item) => item.id).indexOf(id);
    //Removing with splice
    newList.splice(removeIndex, 1);
    setTodos(newList);
  };

  //Marking todo list elements with isCompleted
  const checkeditem = (id, ischecked) => {
    const newList = [...todos];
    //Finding element with id parameter in todo list
    const item = newList.map((item) => item.id).indexOf(id);
    if (ischecked) {
      newList[item].isCompleted = true;
    } else {
      newList[item].isCompleted = false;
    }
    setTodos(newList);
  };

  //Removing all completed elements with clearCompleted button
  const clearCompleted = () => {
    const newList = todos.filter((item) => item.isCompleted === false);
    setTodos(newList);
  };

  //Marking all elements in the list with true or false
  const allCompleted = () => {
    if (allMarked) {
      const newList = todos.filter((item) => item.isCompleted === false);
      newList.forEach((item) => (item.isCompleted = true));
      setallMarked(!allMarked);
      setTodos(newList);
    } else {
      const newList = todos.filter((item) => item.isCompleted === true);
      newList.forEach((item) => (item.isCompleted = false));
      setallMarked(!allMarked);
      setTodos(newList);
    }
  };

  //Filtering our list with activeCategory state
  const categoryElement = () => {
    if (activeCategory === "all") {
      return todos;
    } else if (activeCategory === "active") {
      const newList = todos.filter((item) => item.isCompleted === false);
      return newList;
    } else {
      const newList = todos.filter((item) => item.isCompleted === true);
      return newList;
    }
  };

  //Editing a todo
  const editTodo = (text, id) => {
    const newList = [...todos];
    newList.map((item) => {
      if (item.id === id) {
        item.text = text;
        console.log(item.text);
      }
    });
    console.log(newList);
    setTodos(newList);
  };

  return (
    <div>
      <TodoForm onSubmit={addtodo} />
      <div className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all" onClick={allCompleted}>
          Mark all as complete
        </label>
        <ul className="todo-list">
          <TodoElement
            todos={todos}
            removetodo={removetodo}
            checkeditem={checkeditem}
            categoryElement={categoryElement}
            editTodo={editTodo}
          />
        </ul>
      </div>
      <footer className="footer" hidden={todos.length === 0}>
        <span className="todo-count">
          <strong>
            {"Counting the elements with isCompleted=false"}
            {todos.filter((item) => item.isCompleted === false).length}
          </strong>{" "}
          items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="/#"
              className={activeCategory === "all" ? "selected" : ""}
              onClick={() => {
                setactiveCategory("all");
                categoryElement(activeCategory);
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="/#"
              className={activeCategory === "active" ? "selected" : ""}
              onClick={() => {
                setactiveCategory("active");
                categoryElement(activeCategory);
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="/#"
              className={activeCategory === "comp" ? "selected" : ""}
              onClick={() => {
                setactiveCategory("comp");
                categoryElement(activeCategory);
              }}
            >
              Completed
            </a>
          </li>
        </ul>

        <button className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      </footer>
    </div>
  );
}

export default TodoList;
