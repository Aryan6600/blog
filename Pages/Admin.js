const Router = require("express").Router();
const Admins = require("../database/Schemas/Admin");
const BcryptJs = require("bcryptjs");
const Blogs = require("../database/Schemas/Blogs");
const { body, validationResult } = require("express-validator");

Router.get("/", (req, res) => {
    res.render("Admin.login.ejs");
});

Router.post(
    "/",
    [body("user").isString(), body("pass").isString()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { user, pass } = req.body;
        try {
            const exist = await Admins.findOne().where("username").equals(user);
            if (exist) {
                const admin = await Admins.findOne({ username: user });
                const verify = await BcryptJs.compare(pass, admin.password);
                if (verify) {
                    req.session.user = admin;
                    res.redirect("/admin/dashboard");
                } else {
                    res.redirect("/admin");
                    console.log("Password is incorrect");
                }
            }
        } catch (error) {
            res.redirect("/admin");
            console.log("User is not exist");
        }
    }
);

Router.get("/dashboard", async (req, res) => {
    if (!req.session.user) { return res.redirect("/admin"); }
    const blogs = await Blogs.find({}).sort("-time")
    res.render("Admin.home.ejs", { blogs: blogs, admin: req.session.user })
});

Router.get("/compose", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/admin");
    }
    res.render("Admin.compose.ejs", { admin: req.session.user });
});

Router.post("/compose", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/admin");
    }
    const { title, description, body, thumbnail } = req.body;
    const blog = new Blogs({
        title,
        description,
        body,
        thumbnail,
    });
    blog.save().then(() => {
        res.redirect("/blog/" + blog._id);
    });
});

Router.get('/edit/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/admin')
    try {
        const blog = await Blogs.findById(req.params.id)
        res.render('Admin.edit.ejs', { blog: blog, admin: req.session.user })
    } catch (error) {
        res.redirect('/admin/dashboard')
    }
})

Router.post('/edit/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/admin')
    try {
        const { title, description, body, thumbnail } = req.body;
        const blog = await Blogs.findByIdAndUpdate(req.params.id, { $set: { title, description, body, thumbnail } })
        res.redirect('/blog/' + blog._id)
    } catch (error) {
        res.redirect('/admin/dashboard')
    }
})

module.exports = Router;
