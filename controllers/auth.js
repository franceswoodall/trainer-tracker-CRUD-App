const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user.js'); 
const bcrypt = require('bcrypt'); 

router.post('/sign-up', async (req, res) => {
 
        const userInDatabase = await User.findOne({ username: req.body.username }); 
        if (userInDatabase) {
            return res.send('Username already taken');
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and confirmed password do not match'); 
        }
        const hashedPassword = bycrypt.hashSync(req.body.password, 10); 
        req.body.password = hashedPassword; 

        const user = await User.create(req.body); 
        res.send(`Your account has been created ${user.username}`);

}); 

module.exports = router; 