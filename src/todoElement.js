import { removeTodo, editTodo } from './storage';

export class TodoElement {
    constructor(todo) {
        this.todo = todo;
        this.listItemElement = document.createElement('li');
        this.itemViewElement = document.createElement('div');
        this.titleContainerElement = document.createElement('div');
        this.checkboxElement = document.createElement('input');
        this.labelElement = document.createElement('label');
        this.labelInputElement = document.createElement('input');
        this.removeButtonElement = document.createElement('span');

        this.setupTitle();
        this.setupDeleteButton();
        this.setupView();
    }

    setupTitle() {
        this.titleContainerElement.className = 'title';

        this.setupCheckbox();
        this.setupLabels();

        this.titleContainerElement.append(this.checkboxElement, this.labelElement, this.labelInputElement);
    }

    setupDeleteButton() {
        this.removeButtonElement.className = 'remove';
        this.removeButtonElement.addEventListener('click', () => {
            this.listItemElement.classList.add('deleting');
            setTimeout(() => {
                document.querySelector('#todo-list').removeChild(this.listItemElement);
                removeTodo(this.todo);
                delete this;
            }, 100);
        });
    }

    setupView() {
        this.itemViewElement.className = 'item';
        this.itemViewElement.append(this.titleContainerElement, this.removeButtonElement);

        this.listItemElement.appendChild(this.itemViewElement);
        this.listItemElement.classList.add('adding');
        setTimeout(() => {
            this.listItemElement.classList.remove('adding');
        }, 15);
    }

    setupCheckbox() {
        this.checkboxElement.type = 'checkbox';
        this.checkboxElement.checked = this.todo.status === 'completed';
        this.checkboxElement.addEventListener('change', () => {
            const status = this.checkboxElement.checked ? 'completed' : 'pending';
            this.labelElement.className = status;
            this.todo.status = status;
            editTodo({ ...this.todo, status });
        });
    }

    setupLabels() {
        this.labelElement.className = this.checkboxElement.checked ? 'completed' : 'pending';
        this.labelElement.textContent = this.todo.name;
        this.labelInputElement.className = 'edit';
        this.labelInputElement.classList.add('hidden');
        this.labelInputElement.value = this.todo.name;
        this.labelElement.addEventListener('click', () => {
            this.listItemElement.classList.toggle('edit');
            this.labelElement.classList.toggle('hidden');
            this.labelInputElement.classList.toggle('hidden');
            this.labelInputElement.focus();
        });

        this.labelInputElement.addEventListener('keyup', (ev) => {
            switch (ev.key) {
            case 'Enter':
                this.listItemElement.classList.toggle('edit');
                this.labelElement.textContent = this.labelInputElement.value;
                this.labelElement.classList.toggle('hidden');
                this.labelInputElement.classList.toggle('hidden');

                this.todo.name = this.labelInputElement.value;
                editTodo({ ...this.todo, name: this.labelInputElement.value });
                break;
            case 'Escape':
                this.listItemElement.classList.toggle('edit');
                this.labelElement.classList.toggle('hidden');
                this.labelInputElement.classList.toggle('hidden');
                this.labelInputElement.value = this.todo.name;
                break;
            }
        });
    }
}
