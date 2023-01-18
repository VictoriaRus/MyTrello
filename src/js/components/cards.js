"use strict"

export function createCardTodo(id, title, description, user, time) {
    let base = document.getElementById("list-todo");

    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo" draggable="true" id="${ id }">
                <div class="card-todo__header">
                    <h3 class="title">${ title }</h3>
                    <div class="icon-bg">
                        <i id="edit-${ id }" class="fa-solid fa-pen btn-icon"></i>
                    </div>
                </div>
                <div class="text">
                    <p>${ description }</p>
                </div>
                <div class="date">${ time }</div>
                <div class="user">${ user }</div>
                <div class="buttons">
                    <span>
                        <i id="delete-${ id }" class="fa-solid fa-trash btn-icon"></i>
                    </span>
                    <span>
                        <i id="move-${ id }" class="fa-solid fa-file-export btn-icon"></i>
                    </span>
                </div>
        </div>`);
}

export function createCardProgress(id, title, description, user, time) {
    let base = document.getElementById("list-progress");

    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo" draggable="true" id="${ id }">
                <h3 class="title">${ title }</h3>
                <div class="text">
                    <p>${ description }</p>
                </div>
                <div class="date">${ time }</div>
                <div class="user">${ user }</div>
                <div class="buttons">
                    <span>
                        <i id="back-${ id }" class="fa-solid fa-file-export btn-icon back"></i>
                    </span>
                    <span>
                        <i id="complete-${ id }" class="fa-solid fa-check-to-slot btn-icon"></i>
                    </span>
                </div> 
        </div>`);
}

export function createCardDone(id, title, description, user, time) {
    let base = document.getElementById("list-done");
    
    base.insertAdjacentHTML("beforeEnd",
        `<div class="card card-todo" draggable="true" id="${ id }">
            <h3 class="title">${ title }</h3>
            <div class="text">
                <p>${ description }</p>
            </div>
            <div class="date">${ time }</div>
            <div class="user">${ user }</div>
            <div class="buttons">
                <span>
                    <i id="delete-${ id }" class="fa-solid fa-trash btn-icon"></i>
                </span>
            </div>
        </div>`);
}