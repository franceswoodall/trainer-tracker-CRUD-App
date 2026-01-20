const mongoose = require('mongoose'); 

const trainerSchema = new mongoose.Schema({ 
    nickname: {
        type: String, 
        required: true,
    }, 
    brand: {
        type: String, 
        required: true,
    },
    model: {
        type: String, 
        required: true, 
    }, 
    terrainType: {
        type: String, 
        required: true,
    },
     price: {
        type: Number, 
        required: true, 
        min: 0, 
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    }, 
    favoritedByUsers: [
        {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        }
    ], 
    rating: {
        type: Number, 
        required: false, 
        min: 0, 
    }
}); 

const Trainer = mongoose.model('Trainer', trainerSchema); 

module.exports = Trainer; 