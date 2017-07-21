var express = require('express');
var bodyParser = require('body-parser');

var app = express(); 

var chats = [
    {"name":"serverjohn","message":"wewe","time":"2017-07-13T09:33:47.707Z"},
    {"name":"johnserver","message":"weweewewe","time":"2017-07-13T09:34:56.921Z"}
]

app.use(bodyParser.json()); 

app.post('/data/chat', function(req, res){
    console.log('posted: ' + JSON.stringify(req.body));  
    chats.push(req.body); 
    res.end(JSON.stringify(chats));
});

app.get('/data/chats', function(req, res){
    res.end(JSON.stringify(chats));
});

app.use(express.static('.'));

app.listen(8080, function(){
    console.log('i am started!');
});