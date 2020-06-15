const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectID;

class User {
    constructor(username,email){
        this.name = username;
        this.email=email;
    }
    save()
    {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }
    static findById(userId)
    {
        const db = getDb();
        // return db.collection('users').find({_id:new ObjectId(userId)}).next();  //next mtlb jaaise h ek user mil jaaye is id ka agla kaam karo aur mt khojo
        return db.collection('users').findOne({_id:new ObjectId(userId)})
        // .then(user => {
            // console.log('catch you');
            // console.log(user);
            // return user;
        // })
        // .catch(err=> console.log(err));
    }
}

module.exports = User;