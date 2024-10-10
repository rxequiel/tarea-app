import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/tasksSlice';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ title }));
    setTitle(''); // Limpia el input después de agregar
  };

  return (
    <div>
      <h2>Añadir nueva tarea</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <button type="submit">AGREGAR</button>
      </form>
    </div>
  );
};

export default AddTask;
