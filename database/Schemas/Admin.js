const mongoose = require('../connection.js');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: false,
        default: 'https://i.imgur.com/XQ9xY8L.png'
    }
})


const Admins = mongoose.model('Admins', AdminSchema);

module.exports = Admins;
