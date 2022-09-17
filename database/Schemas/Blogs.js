const mongoose = require('../connection.js');
const slugify = require('slugify');

const BlogsSchema = mongoose.Schema({
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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: false,
        default: "active"
    }
})


BlogsSchema.pre('validate', function (next) {
    // slugify title before saving
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
})

BlogsSchema.index({ title: "text", description: "text" })

const Blogs = mongoose.model('Blogs', BlogsSchema);

module.exports = Blogs;
