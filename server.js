const express = require('express');
const app = express();

app.use(express.json());

// Almacenamiento en memoria
let tasks = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.json({ message: 'API de tareas funcionando' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
