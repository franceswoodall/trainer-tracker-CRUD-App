const express = require('express'); 
const router = express.Router(); 
const Trainer = require('../models/trainer.js'); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

router.get('/', async (req, res) => {
    try {
        const allTrainers = await Trainer.find({}); 
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

module.exports = router; 