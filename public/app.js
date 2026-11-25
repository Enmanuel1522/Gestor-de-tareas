const API = '/tasks';
const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const list = document.getElementById('task-list');
const errorBox = document.getElementById('error');

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function clearError() {
  errorBox.hidden = true;
}

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  render(tasks);
}

function render(tasks) {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'No hay tareas todavía';
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('done');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => updateTask(task.id, { completed: checkbox.checked }));

    const info = document.createElement('div');
    info.className = 'task-info';
    const title = document.createElement('strong');
    title.textContent = task.title;
    const desc = document.createElement('small');
    desc.textContent = task.description;
    info.append(title, desc);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      const newTitle = prompt('Nuevo título:', task.title);
      if (newTitle !== null) updateTask(task.id, { title: newTitle });
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    actions.append(editBtn, deleteBtn);
    li.append(checkbox, info, actions);
    list.appendChild(li);
  });
}

async function createTask(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json();
  if (!res.ok) return showError(body.message);
  clearError();
  loadTasks();
}

async function updateTask(id, data) {
  const res = await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json();
  if (!res.ok) showError(body.message);
  else clearError();
  loadTasks();
}

async function deleteTask(id) {
  if (!confirm('¿Eliminar esta tarea?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await createTask({ title: titleInput.value, description: descInput.value });
  form.reset();
});

loadTasks();