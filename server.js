const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Almacenamiento en memoria
let tasks = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.json({ message: 'API de tareas funcionando' });
});


// Middleware de validación de datos
function validateTask(req, res, next) {
  const { title, description, completed } = req.body;
  const isCreating = req.method === 'POST';

  if (isCreating && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '' || title.length > 100)) {
    return res.status(400).json({ message: 'El título debe ser un texto de 1 a 100 caracteres' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: 'La descripción debe ser texto' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'El campo completed debe ser true o false' });
  }

  next();
}


//RUTAS

// CREATE: crear una tarea
app.post('/tasks', validateTask, (req, res) => {
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
app.put('/tasks/:id', validateTask, (req, res) => {
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


