var webPush = require('web-push');
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(express.static('.'))
app.use(bodyParser.json())

var webpush = require('web-push');


const options = {
  vapidDetails: {
    subject: 'mailto://john.gorter@gmail.com',
    publicKey: 'BDeu3Fk_Q_zRtiYXU8uz_nwdVTqL1K-zk5smuN68f_X-i7PgoVdbe8AN4ariQRN6npW1MGSQBMAkVQw4H5UjMxU',
    privateKey: 'r6RgccMFmxBynQiX5WFkLbxbmUnwG3fdEUS9s2QUIvc'
  },
  TTL: 12,
  headers: {}
}

var endpoint = '';
var key = '';
var auths = '';
var subscription = '';

app.post('/register', function(req, res) {
   console.log('registered');
   endpoint = req.body.endpoint;
   key = req.body.key;
   auths = req.body.authSecret;

   res.sendStatus(201);
});

setInterval(()=>{
    console.log('endpoint', endpoint);
    if (endpoint != ''){
     webPush.sendNotification({
        endpoint: endpoint,
        TTL: 60,
        keys: {
          p256dh: key,
          auth: auths
        }
      }, 'hello world', options)
      .then(function() {
         console.log('push sent');
      })
      .catch(function(error) {
        console.log(error);
       
      });
    }
}, 1000);

app.listen(4002, () => { console.log('listening on port 4002')});
