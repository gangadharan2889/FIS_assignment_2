//Import modules
var express = require('express');
var cors = require('cors');
var path = require('path');

const route = require('./routes/route');

var app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.use('/api', route);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=>{
    console.log('Server started at port:'+port);
})







 
