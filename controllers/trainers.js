const express = require('express'); 
const router = express.Router(); 
const Trainer = require('../models/trainer.js'); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

router.get('/', async (req, res) => {
    try {
        const allTrainers = await Trainer.find({}).populate('owner'); 
        res.render('trainers/index.ejs', {
            trainers: allTrainers, 
            user: req.session.user
        }); 
    } catch (error) {
        res.redirect('/'); 
    }
}); 

router.get('/new', (req, res) => {
    res.render('trainers/new.ejs'); 
}); 

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id; 
         console.log('new trainer data received', req.body); 
        await Trainer.create(req.body); 
        res.redirect('/trainers'); 
    } catch (error) {
        res.redirect('/trainers/new'); 
    }
}); 


module.exports = router; 