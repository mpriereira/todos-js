import '../node_modules/@picocss/pico/css/pico.css';
import './styles.css';
import { getTodos, addTodo, getNewTodoId, saveTheme, getTheme } from './storage';
import { TodoElement } from './todoElement';

function init() {
    setupTheme();
    setupTodos();
}

async function setupTodos() {
    const formElement = document.querySelector('#todo-form');
    formElement.addEventListener('submit', async(ev) => {
        ev.preventDefault();
        const todoInputElement = document.querySelector('#todo-input');
        const id = await getNewTodoId();
        const todo = { id, name: todoInputElement.value, status: 'pending' };
        insertTodoElement(todo);
        addTodo(todo);
        todoInputElement.value = '';
    });

    const todosList = await getTodos();
    todosList.forEach(insertTodoElement);
}

async function setupTheme() {
    const initialTheme = await getTheme();
    const switchElement = document.querySelector('input[role="switch"]');

    document.documentElement.setAttribute('data-theme', initialTheme);
    switchElement.checked = initialTheme === 'dark';

    switchElement.addEventListener('change', () => {
        const theme = switchElement.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        saveTheme(theme);
    });
}

function insertTodoElement(todo) {
    const { listItemElement } = new TodoElement(todo);
    document.querySelector('#todo-list').appendChild(listItemElement);
}

window.addEventListener('DOMContentLoaded', init);
