"use strict"
import { TODOS_KEY } from './CONST';

import {
    listTodo,
    listProgress,
    listDone,
} from './components/lists';

let card;
const empties = document.querySelectorAll('.list');
let cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    registerEventsOnCard(card);
});

export function registerEventsOnCard(card) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

function dragStart(e) {
    card = this;
    setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    setTimeout(() => (this.className = 'card card-todo'), 0);
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() { 
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    
    let updateTodos = todos.map(todo => {

        if (card.id == todo.id) {

            if (this.id === "list-progress") {
                todo.progress = true;
                todo.done = false;
            }
            if (this.id === "list-done") {
                todo.progress = true;
                todo.done = true;
            }
            if (this.id === "list-todo") {
                todo.progress = false;
                todo.done = false;
            }

            return todo;

        } else {
            return todo;
        }

    });

    localStorage.setItem(TODOS_KEY, JSON.stringify(updateTodos));

    listTodo();
    listProgress();
    listDone();

    let cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        registerEventsOnCard(card);
    });

}