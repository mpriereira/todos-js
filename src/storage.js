const todosKey = 'todos-items';
const themeKey = 'theme';

export async function getTodos() {
    return JSON.parse(localStorage.getItem(todosKey)) ?? [];
}

function saveTodos(todos) {
    localStorage.setItem(todosKey, JSON.stringify(todos));
}

export function addTodo(todo) {
    const todos = JSON.parse(localStorage.getItem(todosKey)) ?? [];
    saveTodos([...todos, todo]);
}

export function editTodo(todo) {
    const todos = JSON.parse(localStorage.getItem(todosKey)) ?? [];
    const todoIndex = todos.findIndex(t => t.id === todo.id);

    if (todoIndex === -1) {
        throw new Error('Trying to edit a non-existent todo');
    }

    todos[todoIndex] = todo;
    saveTodos(todos);
}

export function removeTodo({ id }) {
    const todos = JSON.parse(localStorage.getItem(todosKey));
    saveTodos(todos.filter(todo => todo.id !== id));
}

export async function getNewTodoId() {
    const todos = await getTodos();
    return (todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0) + 1;
}

export function saveTheme(theme) {
    localStorage.setItem(themeKey, theme);
}

export async function getTheme() {
    return localStorage.getItem(themeKey) ?? 'light';
}
