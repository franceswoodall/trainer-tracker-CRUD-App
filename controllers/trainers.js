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

// get a list of my trainer entries
router.get('/my-trainers', async (req, res) => {
    try {
    const myTrainers = await Trainer.find({ owner: req.session.user._id }).populate('owner'); 
    
    res.render('trainers/index.ejs', { 
        trainers: myTrainers, 
        listType: 'my-trainers'
    }); 
} catch (error) {
    console.log(error); 
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

        req.session.save((error) => {
            if (error) {
                return res.redirect('/trainers/new'); 
            }
        res.redirect('/trainers/my-trainers'); 
        });
    } catch (error) {
        res.redirect('/trainers/new'); 
    }
}); 

// get a specific trainer
router.get('/:trainerId', async (req, res) => {
    try {
        const populatedTrainer = await Trainer.findById(req.params.trainerId).populate('owner'); 
        if (!populatedTrainer) return res.redirect('/trainers');

        let userHasFavourited = false; 
        if (req.session.user) {
            userHasFavourited = populatedTrainer.favouritedByUsers?.some((userId) => {
                return userId.equals(req.session.user._id);   
        }) || false; 
    }

        res.render('trainers/show.ejs', {
            trainer: populatedTrainer, 
            userHasFavourited: userHasFavourited, 
        }); 

    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
}); 

// render the edit form 
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

// edit the trainer
router.put('/:trainerId', async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.trainerId); 

        if (trainer.owner.equals(req.session.user._id)) {
            await trainer.updateOne(req.body); 
            res.redirect(`/trainers/${req.params.trainerId}`)
        } else {
            res.send('You do not have permission to edit this trainer'); 
        }
    } catch (error) {
        console.log(error); 
        res.redirect('/trainers'); 
    }
}); 

// delete a specific trainer (the user must own)
router.delete('/:trainerId', async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.trainerId); 
        if (trainer.owner.equals(req.session.user._id)) {
        
            await trainer.deleteOne(); 
            res.redirect('/trainers/my-trainers');
        } else {
            res.send('You do not have permission to delete this trainer!'); 
        }
    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
})

//favouriting a trainer 
router.post('/:trainerId/favourite', async (req, res) => {
    try {
        await Trainer.findByIdAndUpdate(req.params.trainerId, {
            $push: { favouritedByUsers: req.session.user._id },
        }); 
        res.redirect(`/trainers/${req.params.trainerId}`); 
    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
}); 

//unfavouriting a trainer
router.delete('/:trainerId/favourite', async (req, res) => {
    try {
        await Trainer.findByIdAndUpdate(req.params.trainerId, {
            $pull: { favouritedByUsers: req.session.user._id }, 
        }); 
        res.redirect(`/trainers/${req.params.trainerId}`); 
    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
}); 
module.exports = router; 