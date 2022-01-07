const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        username: { type: String, lowercase: true, required: true },
        movies: [{
            title: { type: String },
            date: { type: String },
            description: { type: String },
            creator: { type: String },
            genre: { type: String },
            image: { type: String },
            movieID: { type: String }
        }]
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;