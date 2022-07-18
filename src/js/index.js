"use strict"
import {
    time
} from './time';
import {
    onShowModel,
    onCancelModel,
    onCreateTodo,
    onEditTodo,
} from './add_todo';

window.onload = function () {
    time();
    setInterval(time, 10000);
}

const btnAddTodo = document.getElementById('addTodo');
btnAddTodo.addEventListener('click', onShowModel);

const btnCancel = document.getElementById('cancel');
btnCancel.addEventListener('click', onCancelModel);

const btnConfirm = document.getElementById('confirm');
btnConfirm.addEventListener('click', onCreateTodo);

const listTodo = document.getElementById('list-todo');
listTodo.addEventListener('click', onEditTodo);
