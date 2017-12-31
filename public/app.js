
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

}

const interval = setInterval(countDown, 1000);



/*********************
        SOCKET.IO 
 ******************* */

const socket = io();
const form = document.querySelector('#chat-pane form');
let name = undefined;

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    let inputElement = document.querySelector('#chat-pane form input');
    let message = inputElement.value;
    socket.emit('chatMessage',message);

    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = `<strong id="you">${name}: </strong>${message}`;
    messages.appendChild(li);


    inputElement.value = '';

});

socket.on('chatMessage', (message) => {
    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = `${message}`;
    messages.appendChild(li);

    let shouldScroll;

    shouldSCroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;

    messages.appendChild(li);

    if(!shouldScroll) 
        messages.scrollTop = messages.scrollHeight;


});


(function() {

    name = prompt("Enter your desired name: ");
    
    if(name === undefined || name === null || name === '')
        name = 'Anonymous';
   
    socket.emit('join', name);

    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = '<span>You may refresh the page if you want to change your name</span>';
    messages.appendChild(li);
          li.innerHTML = `<span>You have joined as "${name}" in this New Year Countdown Chatroom by jonathan da awesome ! ^_^</span>`;
    messages.appendChild(li);

})();


socket.on('join', (name) => {
    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = `<span>${name} has joined the new year countdown chatroom.</span>`;
    messages.appendChild(li);
});


socket.on('disconnect', (name) => {
    const messages = document.querySelector('#messages');
    const li = document.createElement('li');
          li.innerHTML = `${name} has disconnected.`;
    messages.appendChild(li);
});

socket.on('update', (status) => {
    document.querySelector('h5').innerHTML = status;
});













particlesJS.load('particles-js', 'particlesjs-config.json', function() {
  console.log('particles.js loaded - callback');
});

