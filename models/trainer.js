const mongoose = require('mongoose'); 

const trainerSchema = new mongoose.Schema({ 
    trainerBrand: {
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
    }. 
    favouritedByUsers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
        }
    ]
}); 

const Trainer = mongoose.model('Trainer', trainerSceham); 

module.exports = Trainer; 