"use strict"

export const httpGET = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Wrong url');
        }
    })
}