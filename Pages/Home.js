const Router = require('express').Router()
const Blogs = require('../database/Schemas/Blogs.js')

Router.get('/', async (req, res) => {
    const latest = await Blogs.findOne().sort("-time").select("thumbnail title description slug")
    const blogs = await Blogs.find().sort("-time").skip(1).select("thumbnail title description slug").limit(15)
    res.render('index.ejs', { blogs, latest });
})

module.exports = Router;