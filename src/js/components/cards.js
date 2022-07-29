"use strict"

export function createCardTodo(id, title, description, user, time) {
    let base = document.getElementById('list-todo');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo col-todo" draggable="true" id="${id}">
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

export function createCardProgress(id, title, description, user, time) {
    let base = document.getElementById('list-progress');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo progress-color" id="${id}">
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

export function createCardDone(id, title, description, user, time) {
    let base = document.getElementById('list-done');
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo done-color" id="${id}">
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
