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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
