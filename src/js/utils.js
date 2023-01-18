"use strict"

import {
    httpGET
} from './api';

import {
    URL,
    TODOS_KEY
} from './CONST';

import {
    date
} from './components/time';

import {
    onCancelModel,
    onShowEditModel,
    showWarning,
    onCancelWarning,
} from './components/model_window';

import {
    countProgressTodos,
} from './components/count_todos';

import {
    listTodo,
    listProgress,
    listDone,
} from './components/lists';

import {
    registerEventsOnCard,
} from './drag_n_drop';

let todoId;

export async function getUsers() {
    let select = document.getElementById('select');
    
    return await httpGET(URL).then(res => {
        const users = res;
        users.forEach(user => {
            let option = document.createElement("li");
            option.value = user.name;
            option.innerHTML = user.name;
            select.appendChild(option);
        });
    })
}

///create

export function onCreateTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const user = document.getElementById('title-select').textContent;
    
    const oldTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    const newTodo = {
        id: (new Date).valueOf(),
        title: title,
        description: description,
        user: user,
        time: `${date()} ${timeCreateTodo()}`,
        progress: false,
        done: false,
    };

    const todosToSave = oldTodos ? [...oldTodos, newTodo] : [newTodo];
    saveTodo(todosToSave);

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('title-select').textContent ="Choose a user";

    onCancelModel();
    listTodo();

    let cards = document.querySelectorAll('.card');
 
    cards.forEach((card) => {
        registerEventsOnCard(card);
    });
}

function saveTodo(todo) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todo));
}

function timeCreateTodo() {
    const date = new Date();
    let timeNow = date.toLocaleTimeString().slice(0, -3);
    return timeNow;
}

listTodo();
listProgress();
listDone();

///edit

export function editTodo() {
    const newTitle = document.getElementById('title').value;
    const newDescription = document.getElementById('description').value;
    const newSelect = document.getElementById('title-select').textContent;
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            todo.title = newTitle;
            todo.description = newDescription;
            todo.time = `update ${date()} ${timeCreateTodo()}`;
            todo.user = newSelect;
            return todo;
        } else {
            return todo;
        }

    });

    saveTodo(updateTodos);

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('title-select').textContent ="Choose a user";

    onCancelModel();
    listTodo();

    let cards = document.querySelectorAll('.card');
    console.log(cards);
    cards.forEach((card) => {
        registerEventsOnCard(card);
    });
}

///delete

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
    showWarning("Are you sure you want to delete everything?", () => {
        onDeleteDoneList();
    });
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

///OnClick

export function onEditTodo(event) {
    const theTarget = event.target;
    const oldTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    oldTodos.forEach(todo => {
        if (theTarget.id == `edit-${todo.id}`) {
            getUsers().then(() => {
                onShowEditModel();
                const oldTitle = document.getElementById('title');
                const oldDescription = document.getElementById('description');
                const OldSelect = document.getElementById('title-select');
                OldSelect.textContent = todo.user;
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

export function inMoveProgress() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            let maxCountTodo = countProgressTodos();
            if (maxCountTodo < 3) {
                todo.progress = true;
            } else {
                showWarning("First you need to complete the current one before adding another one.", () => {
                    onAddMore();
                });
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

function onAddMore() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    let updateTodos = todos.map(todo => {
        if (todoId == todo.id) {
            todo.progress = true;
            return todo;
        } else {
            return todo;
        }
    });

    saveTodo(updateTodos);
    listTodo();
    listProgress();
    onCancelWarning();
}