const express = require('express');
const app = express();
const personRoute = express.Router();
let Person = require('../models/Person');
let personData = "[{}]";

// Displays the list of people
personRoute.route('/person').get((req,res,next)=>{
    console.log("Entered route");
    Person.find((err, personData)=> {
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
    Person.create(req.body, (err, personData)=> {
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
    Person.findByIdAndUpdate(req.params.id, {$set : req.body},
        (err, personData)=> {
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
    Person.findOneAndRemove(req.params.id, (err, personData)=> {
        if(err){
            return next(err);
        }
        else{
            res.status(200).json({message: personData});
        }
    })
});

module.exports = personRoute;

