const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:false,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        select: true, // Exclude password from queries by default
        hidden: true // Hide password field in JSON responses
    },
   
});

const User = mongoose.model('User', userSchema);

module.exports = User;