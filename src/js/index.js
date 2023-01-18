"use strict"

import {
    time
} from './components/time';

import {
    CustomSelect
} from './components/customselect';

import {
    onCreateTodo,
    onEditTodo,
    onProgressTodo,
    onDeleteDoneTodo,
    onWarning,
} from './utils';

import {
    onShowModel,
    onCancelModel,
    onCancelWarning,
} from './components/model_window';

import {
    registerEventsOnCard,
} from './drag_n_drop';


window.onload = function () {
    time();
    setInterval(time, 1000);
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
deleteAll.addEventListener('click', onWarning);

const btnCancelWarning = document.getElementById('warning-cancel');
btnCancelWarning.addEventListener('click', onCancelWarning);

let cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    registerEventsOnCard(card);
});

//select
let animalSelect = new CustomSelect({
    elem: document.getElementById('animal-select')
});

document.addEventListener('select', function (event) {
    document.getElementById('result').innerHTML = event.detail.value;
});