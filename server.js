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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
