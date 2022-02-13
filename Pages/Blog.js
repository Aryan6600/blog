const Router = require('express').Router()
const Blogs = require('../database/Schemas/Blogs.js')

Router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blogs.findOne({ _id: id });
        res.render('blog.ejs', { data: blog });
    } catch (error) {
        console.log(error);
        res.render('404.ejs');
    }
})

module.exports = Router;