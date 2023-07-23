var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');


// used to server static files from public directory
app.use(express.static('public'));
app.use(cors());

 // create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);          
        });
});

app.get('/account/all', function (req, res){
    dal.all().
        then((docs) =>{
            console.log(docs);
            res.send(docs);
    });
});
app.post('/login/:email/:password', function (req, res) {
    const { email, password } = req.params;
  
      //not finished submiting what i have and hoped to accomplish with code
    dal.authenticate(email, password)
      .then((user) => {
        if (!user) {
          // if authentication fails return an error response
          res.status(401).send('Invalid email or password');
        } else {
          // if authentication succeeds you can return the user details
          res.send(user);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
      });
  });
  

var port = 3000;
app.listen(port);
console.log('running on port:' + port);




