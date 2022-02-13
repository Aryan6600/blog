const Router = require('express').Router()
const Blogs = require('../database/Schemas/Blogs.js')

Router.get('/', async (req, res) => {
    const latest = await Blogs.findOne().sort("-time")
    const blogs = await Blogs.find().sort("-time").skip(1).limit(15)
    res.render('index.ejs', { blogs, latest });
})

module.exports = Router;