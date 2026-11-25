## Endpoints
- POST /tasks → crea una tarea (body: title, description)

- GET /tasks → lista todas las tareas

- GET /tasks/:id → obtiene una tarea por id

- PUT /tasks/:id → actualiza una tarea (title, description, completed)

- DELETE /tasks/:id → elimina una tarea


## Validaciones
- title: obligatorio al crear, texto de 1 a 100 caracteres

- description: debe ser texto

- completed: debe ser true o false

- Los datos inválidos devuelven error 400


## Frontend
Abre http://localhost:3000 con el servidor en marcha para usar la interfaz web.