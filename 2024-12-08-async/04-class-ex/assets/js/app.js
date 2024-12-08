"use strict";

(() => {
    const getRadndomColorAfterDelay = (delay) => {
        setTimeout(() => {
        const colors = ['red', 'purple', 'blue', 'yellow', 'pink'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
        }, delay);
    }
    setTimeout(() => { document.body.style.backgroundColor = 'white'},4000)
    document.getElementById('colorator').addEventListener('click', getRadndomColorAfterDelay(3000))


})()