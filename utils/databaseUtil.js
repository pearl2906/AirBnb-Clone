const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = "mongodb://localhost:27017/";

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect(url)
    .then((client)=>{
        console.log("Connected to MongoDB");
        _db = client.db("airbnb");
        callback(client);
    })
    .catch((err) =>{
        console.log(err);
        throw err;
    })
}

const getdb = () =>{
    if(!_db){
        throw new Error("Database not connected")
    }
    return _db;
}
exports.mongoConnect = mongoConnect;
exports.getdb = getdb;