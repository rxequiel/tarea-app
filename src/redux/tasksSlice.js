import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL base de la API JSONPlaceholder
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Asincrónicamente obtén las tareas de la API
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`${API_URL}?_limit=10`);
  return response.data;
});

// Crear una nueva tarea
export const createTask = createAsyncThunk('tasks/createTask', async (newTask) => {
  const response = await axios.post(API_URL, newTask);
  return response.data;
});

// Eliminar tarea por ID
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Editar tarea
export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask) => {
  const response = await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
  return response.data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Otras acciones para create, delete y update
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        state.tasks[index] = action.payload;
      });
  },
});

export default tasksSlice.reducer;
