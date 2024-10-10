import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../redux/tasksSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const [editTaskId, setEditTaskId] = useState(null);  // Estado para manejar la edición
  const [editTaskTitle, setEditTaskTitle] = useState('');  // Estado para el título editado

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const handleUpdate = () => {
    dispatch(updateTask({ id: editTaskId, title: editTaskTitle }));
    setEditTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
  };

  const handleReload = () => {
    dispatch(fetchTasks()); // Vuelve a cargar las tareas desde la API
  };

  return (
    <div>
      <h2>TAREAS</h2>
      {loading && <p>Loading tasks...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>
              {editTaskId === task.id ? (
                // Si está en modo edición, muestra el input para editar
                <>
                  <input
                    type="text"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {task.title} 
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
      <button onClick={handleReload}>RECARGAR TAREAS</button> {/* Botón para recargar tareas */}
    </div>
  );
};

export default TaskList;
