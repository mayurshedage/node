const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    contact: {
        type: Number,
    },
    createdAt: {
        type: Number,
        require: true
    },
    updatedAt: {
        type: Number,
    }
});

UserSchema.index({ name: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);