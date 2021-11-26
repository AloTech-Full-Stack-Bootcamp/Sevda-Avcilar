import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoList />
      </header>
    </section>
  );
}

export default App;
