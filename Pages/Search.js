const Router = require('express').Router()
const Blogs = require('../database/Schemas/Blogs.js')

Router.get('/', async (req, res) => { // Search
    const search = req.query.q;
    if (search) {
        try {
            const blogs = await Blogs.find({ $text: { $search: search } }).select("title description slug").limit(10);
            res.json(blogs);
        } catch (err) {
            res.render('404.ejs');
        }
    }
    else {
        res.render('search.ejs');
    }
})


module.exports = Router;