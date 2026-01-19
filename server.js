const dotenv = require('dotenv'); 
dotenv.config(); 

const express = require ('express'); 
const app = express(); 

const mongoose = require('mongoose'); 
const methodOverride = require('method-override'); 
const morgan = require('morgan'); 
const session = require('express-session'); 

const port = process.env.PORT ? process.env.PORT : '3000'; 

const authController = require('./controllers/auth.js'); 
const trainersController = require('./controllers/trainers.js'); 

mongoose.connect(process.env.MONGODB_URI); 

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`); 
})

app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method")); 
app.use(morgan('dev')); 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, 
        saveUninitialized: true,
    })
); 
app.use((req, res, next) => {
    res.locals.user = req.session.user ? req.session.user: null;
    next(); 
});

app.use('/auth', authController); 
app.use('/trainers', trainersController); 
// routes

app.get('/', async (req, res) => {
    res.render('index.ejs', {
        user: req.session.user,  
    }); 
}); 


// port

app.listen(port, () => {
    console.log(`Trainer app is ready on port ${port}!`); 
})