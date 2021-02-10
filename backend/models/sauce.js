const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, default: null },
    name: { type: String, required: true, default: null },
    manufacturer: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
    mainPepper: { type: String, required: true, default: null },
    imageUrl: { type: String, required: true, default: null },
    heat: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: [String], required: false, default: [] },
    usersDisliked: { type: [String], required: false, default: [] }



});

module.exports = mongoose.model('Sauce', sauceSchema);