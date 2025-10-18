const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    houseName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    guests: { type: Number, required: true },
    imageUrl: String
});

module.exports = mongoose.model('Home', homeSchema);