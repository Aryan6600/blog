const mongoose = require('../connection.js');

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: false,
        default: Date.now
    }
})

BlogsSchema.index({ title: "text", description: "text" })

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;
