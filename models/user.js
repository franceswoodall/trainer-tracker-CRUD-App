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

const User = mongoose.model('User', userSchema); 

module.exports = User; 