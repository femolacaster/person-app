const mongoose = require('mongoose');
const Schema = mongoose.schema;

let person = new Schema({
    name: {type:string},
    age: {type:number},
    gender: {type:string},
    mobile_number: {type:string}
},
{collections:person});

modules.exports = mongoose.model('person', person);