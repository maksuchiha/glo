'use strict'

const getData = () => {
    fetch('./data/db.json')
        .then(data => data.json())
        .then(newData => sendData(newData))
        .catch(error => console.log(error))
}

const sendData = (data) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
        },
    }).catch(error => console.log(error))
}

getData()