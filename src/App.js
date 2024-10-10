import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import ErrorAlert from './components/ErrorAlert';
const App = () => {
  return (
    <div className="App">
      <h1>GESTOR DE TAREAS</h1>
      <AddTask />
      <TaskList />
      <ErrorAlert />
    </div>
  );
};

export default App;
