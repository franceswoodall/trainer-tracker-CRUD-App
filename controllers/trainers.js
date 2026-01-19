const express = require('express'); 
const router = express.Router(); 
const Trainer = require('../models/trainer.js'); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

router.get('/', (req, res) => {
    res.send('trainers index page'); 
}); 

module.exports = router; 