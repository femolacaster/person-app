const express = require('express'), app = require('app');
express();
const personRoute = express.Router();
let person = require('../models/person');

// Displays the list of people
personRoute.route('/person').get((req,res,next)=>{
    person.find((err, data)=> {
        if(err){
            return next(err);
        }
        else{
            res.json(personData);
        }
    })
});

//Creates a single person
personRoute.route('/person').post((req,res,next)=>{
    person.create(req.body, (err, data)=> {
        if(err){
            return next(err);
        }
        else{
            res.json(personData);
        }
    })
});


//Updates a single person
personRoute.route('/person/:id').put((req,res,next)=>{
    person.findByIDAndUpdate(req.params.id, {$set : req.body},
        (err, data)=> {
        if(err){
            return next(err);
            console.log(err);
        }
        else{
            res.json(personData);
            console.log("Data Updated Successfully");
        }
    })
});

//Deletes a single person
personRoute.route('/person/:id').delete((req,res,next)=>{
    person.findOneAndRemove(req.params.id, (err, data)=> {
        if(err){
            return next(err);
        }
        else{
            res.status(200).json({message: personData});
        }
    })
});

module.exports = personRoute;

