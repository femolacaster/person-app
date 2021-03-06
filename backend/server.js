let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    createError = require('http-errors'),
    dbConfig = require('./database/db');

//Mongo DB Connection
mongoose.connect(dbConfig.db, {useNewUrlParser: true})
.then(
    () => {  console.log("Database now connected") },
    error=> {console.log("Database could not be connected"+error)}
)

//Middleware consolidation
const personRoute = require('../backend/routes/person.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
//app.use(express.static(path.join(__dirname, '/public/person-app')));
//app.use('/',express.static(path.join(__dirname, '/public/person-app')));
app.use('/api', personRoute);

//PORT creation
const port = process.env.PORT || 8000;
const server = app.listen(port, ()=>{console.log("Port " + port + " now connected")});

//Handle absent middleware resource and pass to error middleware
app.use((req, res, next)=>{next(createError(404))});

//Handles all other HTTP error or reports a 500 if no error present 
app.use(function (err,req,res,next) {
    console.error(err.message);
    console.error(err.statusCode);
    
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
    });




