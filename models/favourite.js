const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    home: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true }
  
});

module.exports = mongoose.model('Favourite', favouriteSchema);