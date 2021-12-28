const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: [15, '{PATH} alanı en fazla {MAXLENGTH} karakter olmalıdır.'],
        minlength: [3, '{PATH} alanı en az {MINLENGTH} karakter olmalıdır.'],
    },
    name: {
        type: String,
        required: true,
        maxlength: [15, '{PATH} alanı en fazla {MAXLENGTH} karakter olmalıdır.'],
        minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalıdır.'],
    },
    middle_name: {
        type: String,
        required: false,
    },
    surname: {
        type: String,
        required: true,
        maxlength: [15, '{PATH} alanı en fazla {MAXLENGTH} karakter olmalıdır.'],
        minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalıdır.'],
    },
    category: {
        type: String,
        required: true,
        maxlength: [15, '{PATH} alanı en fazla {MAXLENGTH} karakter olmalıdır.'],
        minlength: [5, '{PATH} alanı en az {MINLENGTH} karakter olmalıdır.'],
    },
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);