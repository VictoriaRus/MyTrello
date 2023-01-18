"use strict"

import {
    TODOS_KEY
} from "../CONST";

export function countNewTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (todos) {
        let count = 0;

        todos.forEach(todo => {
            if (!todo.progress && !todo.done) {
                count++;
            };
        });

        let countTodos = document.getElementById("count-todos");
        countTodos.innerHTML = count;

        return count;
    }
}

export function countProgressTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (todos) {
        let count = 0;

        todos.forEach(todo => {
            if (todo.progress && !todo.done) {
                count++;
            }

        });

        let countTodos = document.getElementById("count-progress");
        countTodos.innerHTML = count;

        return count;
    }
}

export function countDoneTodos() {
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));

    if (todos) {
        let count = 0;
        
        todos.forEach(todo => {
            if (todo.progress && todo.done) {
                count++;
            };
        });

        let countTodos = document.getElementById("count-done");
        countTodos.innerHTML = count;

        return count;
    }
}