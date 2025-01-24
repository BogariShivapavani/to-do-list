const API_URL = 'http://localhost:5000/todos';

// Fetch and display todos
async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';  // Clear the list before re-rendering

    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => toggleTodo(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Add a new todo
async function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text === '') return alert('Please enter a todo');

    const newTodo = { text };
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
    });
    const addedTodo = await res.json();
    fetchTodos();
    input.value = '';  // Clear input field
}

// Toggle todo completion
async function toggleTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'PUT' });
    fetchTodos();
}

// Delete a todo
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

// Initial fetch
fetchTodos();
