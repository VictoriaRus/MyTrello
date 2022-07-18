"use strict"
export function time() {
    const clock = document.getElementById('time');
    const date = new Date();
    let timeNow = date.toLocaleTimeString().slice(0, -3);
    clock.innerText = timeNow;
}