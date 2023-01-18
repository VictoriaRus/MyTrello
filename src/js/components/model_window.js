"use strict"

import {
    getUsers,
    editTodo,
} from '../utils';

export function onShowModel() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    const btnUpdate = document.getElementById('update');
    btnUpdate.classList.add('hidden');
    const btnConfirm = document.getElementById('confirm');
    btnConfirm.classList.remove('hidden');

    getUsers();
}

export function onShowEditModel() {
    onShowModel();
    const btnConfirm = document.getElementById('confirm');
    const btnUpdate = document.getElementById('update');
    btnConfirm.classList.add('hidden');
    btnUpdate.classList.remove('hidden');

    btnUpdate.addEventListener('click', editTodo);
}

export function onCancelModel() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('title-select').textContent ="Choose a user";
}

export function showWarning(text, func) {
    const warning = document.getElementById('warning');
    warning.classList.remove('hidden');
    let p = document.getElementById('text');
    p.innerHTML = text;
    const btnWarningConfirm = document.getElementById('warning-confirm');
    
    btnWarningConfirm.addEventListener("click", func, {
        once: true
    });
}

export function onCancelWarning() {
    const warning = document.getElementById('warning');
    warning.classList.add('hidden');
}