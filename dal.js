const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("connected to db server");

    db = client.db('BadBank');
});

//create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function (err, result){
            err ? reject(err) : resolve(doc);
        });
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
                .collection('users')
                .find({})
                .toArray(function(err, docs){
                    err ? reject(err) : resolve(docs);
        });
    })
}
function authenticate(email, password) {
    // Find the user with the provided email in the users array
    const user = users.find((user) => user.email === email);
  
    // If user not found or password does not match, return null
    if (!user || user.password !== password) {
      return null;
    }
  
    // If user and password match, return the user object
    return user;
  }
module.exports = {create, all, authenticate};
