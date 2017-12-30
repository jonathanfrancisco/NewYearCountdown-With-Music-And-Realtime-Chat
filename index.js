


const express = require('express');
const path = require('path');
const app = express();
      app.use(express.static('public'));
      app.use(express.static(path.join(__dirname,'public')));



app.get('/', (req, res)=> {
    res.render('index');
});

app.listen(3000, ()=> {
    console.log('Listening on port 3000');
});