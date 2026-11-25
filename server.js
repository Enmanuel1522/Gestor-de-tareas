const express = require('express');
const app = express();

app.use(express.json());

// Almacenamiento en memoria
let tasks = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.json({ message: 'API de tareas funcionando' });
});

//RUTAS

// CREATE: crear una tarea
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});


// READ: listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// READ: obtener una tarea por id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  res.json(task);
});


// UPDATE: actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  const { title, description, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});


// DELETE: eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Tarea eliminada correctamente' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
