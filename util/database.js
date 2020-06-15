const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect= ( callback ) => {

 MongoClient.connect('mongodb+srv://admin:1416root@cluster0-dftyh.mongodb.net/shop?retryWrites=true&w=majority')
.then(client => {
    console.log("Connected");
    _db=client.db();
    callback();
})
.catch(err =>{ 
console.log(err); 
throw err;
});

};

const getDb =( ) => {
    if(_db)
    {
        return _db;
    }
    throw "No connection found";
}

exports.getDb = getDb;
exports.mongoConnect= mongoConnect;