const Router = require('express').Router()
const Blogs = require('../database/Schemas/Blogs.js')

Router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;
    try {
        const blog = await Blogs.findOne({ slug: slug, status: "active" });
        res.render('blog.ejs', { data: blog });
    } catch (error) {
        res.render('404.ejs');
    }
})

module.exports = Router;