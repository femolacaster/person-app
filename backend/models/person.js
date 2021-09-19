const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Person = new Schema({
    name: {type:String},
    age: {type:Number},
    gender: {type:String},
    mobile_number: {type:String}
},
{collection: 'persons'});

module.exports = mongoose.model('Person', Person);