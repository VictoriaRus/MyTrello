"use strict"
import {
    TODOS_KEY
} from './CONST';

import {
    listTodo,
    listProgress,
} from './components/lists';


let card;
const empties = document.querySelectorAll('.list');
let cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    registerEventsOnCard(card);
});

function registerEventsOnCard(card) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
    console.log("Start");

    //this.className += ' hold';
    card = this;
    console.log(card);
    console.log(card.id);

    //e.currentTarget.style.border = "dashed";//
    //e.dataTransfer.setData("text", e.target.id);//
    //e.effectAllowed = "move";//

    //setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
    console.log("End");

    //this.className = 'fill';
    //e.dataTransfer.clearData();//
}

function dragOver(e) {
    //console.log("Over");
    e.preventDefault();
}

function dragEnter(e) {
    // console.log("Enter");
    e.preventDefault();
    this.className += ' hovered';
}

function dragLeave() {
    //console.log("Leave");
    //this.className = 'empty';

}

function dragDrop() { //this -> list 
    console.log("Drop");
    //this.className = 'empty';

    //this.append(card);
    console.log(card.id);
    const todos = JSON.parse(localStorage.getItem(TODOS_KEY));
    let updateTodos = todos.map(todo => {
        if (card.id == todo.id) {
            todo.progress = true;
            return todo;
        } else {
            return todo;
        }
    });

    localStorage.setItem(TODOS_KEY, JSON.stringify(updateTodos));

     //listTodo(); // Как правильно перерисовать листы после измениния в localStorage?
     listProgress(); 
}