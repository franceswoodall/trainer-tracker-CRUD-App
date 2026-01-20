const mongoose = require('mongoose'); 
const router = require('../controllers/auth');

const userSchema = mongoose.Schema({
    username: {
        type: String, 
        required: true, 
    }, 
    password: {
        type: String, 
        required: true,
    }, 
}); 

router.get('/community', async (req, res) => {
    try {
        const allUsers = await User.find({}, 'username');
        res.render('community.ejs', { communityUsers: allUsers }); 
    } catch (error) {
        console.log(error); 
        res.redirect('/'); 
    }
}); 

const User = mongoose.model('User', userSchema); 

module.exports = User; 