

/*********************
        COUNT DOWN
 * ***************** */
const countDownDate = new Date('January 1, 2018 00:00:00').getTime();

const countDown = () => {
    
    let dateNow = new Date().getTime();
    let remainingTime = countDownDate - dateNow;
    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    let countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if(countdownText === '0d 0h 1m 8s') {
        const auldLangSyne = document.querySelector('audio');
        auldLangSyne.play();
    }
    
    document.querySelector('#count-down h1').innerHTML = countdownText;

    if(countdownText === '0d 0h 0m 11s')
        document.querySelector('#count-down').innerHTML = `<h1 style="font-size: 90vh;">${seconds}</h1>`;
    
    if(remainingTime < 0) {
        clearInterval(interval);
        document.querySelector('#count-down').innerHTML = `<h1 style="font-size: 30em; margin: 0;">2018<h1>`;

        setInterval(()=>{
            var r = Math.floor(Math.random()*255)+1;
            var g = Math.floor(Math.random()*255)+1;
            var b = Math.floor(Math.random()*255)+1;
            document.querySelector('#count-down').style.color = `rgb(${r},${g},${b})`;
        },200);

    }

}

let interval = setInterval(countDown, 1000);



/*********************
        SOCKET.IO 
 ******************* */

const socket = io();
const form = document.querySelector('#chat-pane form');
let name = undefined;

function appendMessage(message) {
    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = message;
    messages.appendChild(li);
}

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    const inputElement = document.querySelector('#chat-pane form input');
    let message = inputElement.value;
    socket.emit('chatMessage',message);

    appendMessage(`<strong id="you">${name}: </strong>${message}`);
    inputElement.value = '';

});

socket.on('chatMessage', (message) => {
    appendMessage(message);
});


socket.on('join', (name) => {
    appendMessage(`<span>${name} has joined the new year countdown chatroom.</span>`);
});


socket.on('disconnect', (name) => {
    appendMessage(`${name} has disconnected.`);
});

socket.on('update', (status) => {
    document.querySelector('h5').innerHTML = status;
});


(function() {

    name = prompt("Enter your alias name: ");
    
    if(name === undefined || name === null || name === '')
        name = 'Anonymous';
   
    socket.emit('join', name);

    appendMessage('<span>You may refresh the page if you want to change your name</span>');
    appendMessage(`<span>You have joined as "${name}" in this New Year Countdown Chatroom by jonathan da awesome ! ^_^</span>`);

})();


particlesJS.load('particles-js', 'particlesjs-config.json', function() {
  console.log('particles.js loaded - callback');
});

