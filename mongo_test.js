var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!')

    // database name
    const dbName = "BadBank";
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into users tab
    var collection = db.collection('users');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('document inserted')
    });

    var users = db
        .collection('users')
        .find()
        .toArray(function(err,docs){
            console.log('Collection:',docs);

            //clean up
            client.close();
        
        });




});
   