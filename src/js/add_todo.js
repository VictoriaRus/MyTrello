"use strict"
import {
    httpGET
} from './api';

const URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_KEY = 'list-todo';
let todoId;

async function getUsers() {
    let select = document.getElementById('select');
    return await httpGET(URL).then(res => {
        const users = res;
        users.forEach(user => {
            let option = document.createElement("option");
            option.value = user.name;
            option.innerHTML = user.name;
            select.appendChild(option);
        });
    })
}

export function onShowModel() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    const btnUpdate = document.getElementById('update');
    btnUpdate.classList.add('hidden');
    const btnConfirm = document.getElementById('confirm');
    btnConfirm.classList.remove('hidden');
    getUsers();
}

export function onCancelModel() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
}

export function onCancelWarning() {
    const warning = document.getElementById('warning');
    warning.classList.add('hidden');
}

function saveTodo(todo) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todo));
}

function date() {
    const date = new Date();
    let timeNow = date.toLocaleDateString();
    return timeNow;
}

function time() {
    const date = new Date();
    let timeNow = date.toLocaleTimeString().slice(0, -3);
    return timeNow;
}

export function onCreateTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const user = document.getElementById('select').value;

    const oldTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    const newTodo = {
        id: (new Date).valueOf(),
        title: title,
        description: description,
        user: user,
        time: `${date()} ${time()}`,
        progress: false,
        done: false,
    };

    const todosToSave = oldTodos ? [...oldTodos, newTodo] : [newTodo];
    saveTodo(todosToSave);

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('select').value = "";

    onCancelModel();
    listTodo();
}
listTodo();
listProgress();
listDone();


function listTodo() {
    countNewTodos();
    countProgressTodos();
    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (listTodos) {
        let base = document.getElementById('list-todo');
        base.innerHTML = '';
        listTodos.forEach(todo => {
            if (!todo.progress) {
                createCardTodo(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });
    }
}

function createCardTodo(id, title, description, user, time) {
    let base = document.getElementById('list-todo');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card-todo col-todo">
            <div class="col">
                <h3 class="title">${title}</h3>
                <div class="text">
                    <p>${description}</p>
                </div>
                <div class="user">${user}</div>
            </div>
            <div class="col">
                <div class="buttons">
                    <button id="edit-${id}">EDIT</button>
                    <button id="delete-${id}">DELETE</button>
                </div>
                <div>
                    <button id="move-${id}"> > </button>
                </div>
                <div class="date">${time}</div>
            </div>
        </div>`);

}

function listProgress() {
    countNewTodos();
    countProgressTodos();
    countDoneTodos();
    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (listTodos) {
        let base = document.getElementById('list-progress');
        base.innerHTML = '';
        listTodos.forEach(todo => {
            if (todo.progress && !todo.done) {
                createCardProgress(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });
    }
}

function createCardProgress(id, title, description, user, time) {
    let base = document.getElementById('list-progress');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card-todo progress-color">
            <div class="col">
                <h3 class="title">${title}</h3>
                <div class="text">
                    <p>${description}</p>
                </div>
                <div class="user">${user}</div>
            </div>
            <div class="col">
                <div class="buttons">
                    <button id="back-${id}">BACK</button>
                    <button id="complete-${id}">COMPLETE</button>
                </div>
                <div class="date">${time}</div>
            </div>
        </div>`);
}

function listDone() {
    countNewTodos();
    countProgressTodos();
    countDoneTodos();
    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (listTodos) {
        let base = document.getElementById('list-done');
        base.innerHTML = '';
        listTodos.forEach(todo => {
            if (todo.done && todo.progress) {
                createCardDone(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });
    }
}

function createCardDone(id, title, description, user, time) {
    let base = document.getElementById('list-done');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card-todo done-color">
            <div class="col">
                <h3 class="title">${title}</h3>
                <div class="text">
                    <p>${description}</p>
                </div>
                <div class="user">${user}</div>
            </div>
            <div class="col">
                <div class="buttons">
                    <button id="delete-${id}">DELETE</button>
                </div>
                <div class="date">${time}</div>
            </div>
        </div>`);
}

function onShowEditModel() {
    onShowModel();
    const btnConfirm = document.getElementById('confirm');
    const btnUpdate = document.getElementById('update');
    btnConfirm.classList.add('hidden');
    btnUpdate.classList.remove('hidden');

    btnUpdate.addEventListener('click', editTodo);
}

export function onEditTodo(event) {
    const theTarget = event.target;
    const oldTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    oldTodos.forEach(todo => {
        if (theTarget.id == `edit-${todo.id}`) {
            /*let card = theTarget.parentElement.parentElement.parentElement;
            card.classList.add('col-warning');*/
            getUsers().then(() => {
                onShowEditModel();
                const oldTitle = document.getElementById('title');
                const oldDescription = document.getElementById('description');
                const OldSelect = document.getElementById('select');
                OldSelect.value = todo.user;
                oldTitle.value = todo.title;
                oldDescription.value = todo.description;
                todoId = todo.id;
            })
        } else if (theTarget.id == `delete-${todo.id}`) {
            todoId = todo.id;
            deleteTodo();
        } else if (theTarget.id == `move-${todo.id}`) {
            todoId = todo.id;
            inMoveProgress();
        }
    });

}

export function onProgressTodo(event) {
    const theTarget = event.target;
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    todos.forEach(todo => {
        if (theTarget.id == `back-${todo.id}`) {
            todoId = todo.id;
            backTodo();
        } else if (theTarget.id == `complete-${todo.id}`) {
            todoId = todo.id;
            completeTodo();
        }
    });
}

export function onDeleteDoneTodo(event) {
    const theTarget = event.target;
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    todos.forEach(todo => {
        if (theTarget.id == `delete-${todo.id}`) {
            todoId = todo.id;
            deleteTodo();
        }
    });
}

function backTodo() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            todo.progress = false;
            return todo;
        } else {
            return todo;
        }
    });

    saveTodo(updateTodos);
    listTodo();
    listProgress();
    listDone();
}

function completeTodo() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            todo.done = true;
            return todo;
        } else {
            return todo;
        }

    });

    saveTodo(updateTodos);
    listTodo();
    listProgress();
    listDone();
}

function inMoveProgress() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            let maxCountTodo = countProgressTodos();
            if (maxCountTodo < 3) {
                todo.progress = true;
            } else {
                showWarning("Сначало надо выполнитe текущее прежде чем ещё добавить одно дело.");
                //*нажимаем confirm */
                
                /*if(true){
                    todo.progress = true;
                }*/
            }

            return todo;
        } else {
            return todo;
        }
    });

    saveTodo(updateTodos);
    listTodo();
    listProgress();
}



function showWarning(text) {
    const warning = document.getElementById('warning');
    let p = document.getElementById('text');
    p.innerHTML = text;
    warning.classList.remove('hidden');
}

function editTodo() {
    const newTitle = document.getElementById('title').value;
    const newDescription = document.getElementById('description').value;
    const newSelect = document.getElementById('select').value;
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            todo.title = newTitle;
            todo.description = newDescription;
            todo.time = `update ${date()} ${time()}`;
            todo.user = newSelect;
            return todo;
        } else {
            return todo;
        }

    });

    saveTodo(updateTodos);

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('select').value = "";

    onCancelModel();
    listTodo();
}


function deleteTodo() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        todos.splice(index, 1);
    }
    saveTodo(todos);
    onCancelModel();
    listTodo();
    listDone();
}

export function onWarning() {
    showWarning("Вы точно хотите удолить всё?");
    const btnWarningConfirm = document.getElementById('warning-confirm');
    btnWarningConfirm.addEventListener("click", onDeleteDoneList);
}

export function onDeleteDoneList() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    let newTodos = todos.filter(todo => {
        if (!todo.done) {
            return todo;
        }
    });
    saveTodo(newTodos);
    listTodo();
    listProgress();
    listDone();
    onCancelWarning();
}

///
//колличество заданий в колонках

function countNewTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (todos) {
        let count = 0;
        todos.forEach(todo => {
            if (!todo.progress && !todo.done) {
                count++;
            };
        });
        let countTodos = document.getElementById('count-todos');
        countTodos.innerHTML = count;
    }
}

function countProgressTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (todos) {
        let count = 0;
        todos.forEach(todo => {
            if (todo.progress && !todo.done) {
                count++;
            }

        });
        let countTodos = document.getElementById('count-progress');
        countTodos.innerHTML = count;
        return count;
    }

}

function countDoneTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if (todos) {
        let count = 0;
        todos.forEach(todo => {
            if (todo.progress && todo.done) {
                count++;
            };
        });
        let countTodos = document.getElementById('count-done');
        countTodos.innerHTML = count;
    }
}
///