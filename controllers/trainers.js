const express = require('express'); 
const router = express.Router(); 
const Trainer = require('../models/trainer.js'); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

router.get('/', async (req, res) => {
    res.render('trainers/index.ejs'); 
}); 

module.exports = router; 