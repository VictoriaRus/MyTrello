"use strict"
import {
    time
} from './time';
import {
    onShowModel,
    onCancelModel,
    onCreateTodo,
    onEditTodo,
    onProgressTodo,
    onDeleteDoneTodo,
    onCancelWarning,
    onWarning,
   
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

const listProgress = document.getElementById('list-progress');
listProgress.addEventListener('click', onProgressTodo);

const listDone = document.getElementById('list-done');
listDone.addEventListener('click', onDeleteDoneTodo);

const deleteAll = document.getElementById('delete-all');
//deleteAll.addEventListener('click', onDeleteDoneList);
deleteAll.addEventListener('click', onWarning);

const btnCancelWarning = document.getElementById('warning-cancel');
btnCancelWarning .addEventListener('click', onCancelWarning);

