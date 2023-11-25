import './styles.css';
import { getTodos, addTodo, getNewTodoId } from './storage';
import { Todo } from './todo';

async function init() {
    const formElement = document.getElementById('todo-form');
    formElement.addEventListener('submit', async(ev) => {
        ev.preventDefault();
        const todoInputElement = document.getElementById('todo-input');
        const id = await getNewTodoId();
        const todo = { id, name: todoInputElement.value, status: 'pending' };
        insertTodoElement(todo);
        addTodo(todo);
        todoInputElement.value = '';
    });

    const todosList = await getTodos();
    todosList.forEach(insertTodoElement);
}

function insertTodoElement(todo) {
    const todoElement = new Todo(todo);
    document.getElementById('todo-list').appendChild(todoElement.listItemElement);
}

window.addEventListener('DOMContentLoaded', init);
