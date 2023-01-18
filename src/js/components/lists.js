"use strict"

import { TODOS_KEY } from "../CONST";

import {
    countNewTodos,
    countProgressTodos,
    countDoneTodos,
} from "./count_todos";

import {
    createCardTodo,
    createCardProgress,
    createCardDone,
} from "./cards";


export function listTodo() {
    countNewTodos();
    countProgressTodos();

    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (listTodos) {
        let base = document.getElementById("list-todo");
        base.innerHTML = "";

        listTodos.forEach(todo => {
            if (!todo.progress) {
                createCardTodo(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });

    }
    
}

export function listProgress() {
    countNewTodos();
    countProgressTodos();
    countDoneTodos();

    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (listTodos) {
        let base = document.getElementById("list-progress");
        base.innerHTML = "";

        listTodos.forEach(todo => {
            if (todo.progress && !todo.done) {
                createCardProgress(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });

    }

}

export function listDone() {
    countNewTodos();
    countProgressTodos();
    countDoneTodos();

    const listTodos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (listTodos) {
        let base = document.getElementById("list-done");
        base.innerHTML = "";

        listTodos.forEach(todo => {
            if (todo.done && todo.progress) {
                createCardDone(todo.id, todo.title, todo.description, todo.user, todo.time);
            }
        });

    }
    
}
