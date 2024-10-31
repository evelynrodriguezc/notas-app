
import React from "react";
import TaskList from "./TaskList";
import "./styles.css"
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <h1>Notes App</h1>
      <TaskList/>
    </div>
  );
}

export default App;
