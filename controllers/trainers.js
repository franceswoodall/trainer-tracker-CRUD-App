const express = require('express'); 
const router = express.Router(); 
const Trainer = require('../models/trainer.js'); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

// get all trainers
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

// create a new trainer
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

// get a specific trainer
router.get('/:trainerId', async (req, res) => {
    try {
        const populatedTrainer = await Trainer.findById(req.params.trainerId).populate('owner'); 
        if (!populatedTrainer) return res.redirect('/trainers');

        const userHasFavourited = populatedTrainer.favouritedByUsers?.some((userId) => {
            return userId.equals(req.session.user._id); 
        }) || false; 

        res.render('trainers/show.ejs', {
            trainer: populatedTrainer, 
            userHasFavourited: userHasFavourited, 
        }); 
        
    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
}); 

// edit the trainer 
router.get('/:trainerId/edit', async (req, res) => {
    try {
        const currentTrainer = await Trainer.findById(req.params.trainerId); 
        res.render('trainers/edit.ejs', {
            trainer: currentTrainer, 
        })
    } catch (error) {
        res.redirect('/');
    };
})


// delete a specific trainer

module.exports = router; 