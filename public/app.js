



const countDownDate = new Date('January 1, 2018 00:00:00').getTime();

const countDown = () => {
    
    let dateNow = new Date().getTime();
    let remainingTime = countDownDate - dateNow;

    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
    let countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    document.querySelector('#count-down h1').innerHTML = countdownText;

}

const interval = setInterval(countDown, 1000);


const socket = io();
const form = document.querySelector('#chat-pane form');

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    let inputElement = document.querySelector('#chat-pane form input');
    let message = inputElement.value;
    socket.emit('chatMessage',message);
    inputElement.value = '';

});

socket.on('chatMessage', (message) => {
    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = message;
    messages.appendChild(li);
});