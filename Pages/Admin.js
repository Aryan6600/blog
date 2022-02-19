const Router = require("express").Router();
const Admins = require("../database/Schemas/Admin");
const BcryptJs = require("bcryptjs");
const Blogs = require("../database/Schemas/Blogs");
const { body, validationResult } = require("express-validator");

// Router For / 

Router.route("/")
    .get((req, res) => {
        res.render("Admin.login.ejs");
    })
    .post([body("user").isString(), body("pass").isString()],
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
            }
        }
    );


// Router For /dashboard

Router.get("/dashboard", async (req, res) => {
    if (!req.session.user) { return res.redirect("/admin"); }
    const blogs = await Blogs.find({}).sort("-time")
    res.render("Admin.home.ejs", { blogs: blogs, admin: req.session.user })
});

// Router For /compose

Router.route("/compose")
    .get((req, res) => {
        if (!req.session.user) {
            return res.redirect("/admin");
        }
        res.render("Admin.compose.ejs", { admin: req.session.user });
    })
    .post((req, res) => {
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
            res.redirect("/blog/" + blog.slug);
        });
    })

// Router for Editing
Router.route("/edit/:slug")
    .get(async (req, res) => {
        if (!req.session.user) return res.redirect('/admin')
        try {
            const blog = await Blogs.findById(req.params.slug)
            res.render('Admin.edit.ejs', { blog: blog, admin: req.session.user })
        } catch (error) {
            res.redirect('/admin/dashboard')
        }
    })
    .post(async (req, res) => {
        if (!req.session.user) return res.redirect('/admin')
        try {
            const { title, description, body, thumbnail } = req.body;
            const blog = await Blogs.findById(req.params.slug)
            blog.title = title;
            blog.description = description;
            blog.body = body;
            blog.thumbnail = thumbnail;
            await blog.save()
            res.redirect('/blog/' + blog.slug)
        } catch (error) {
            res.redirect('/admin/dashboard')
        }
    })


module.exports = Router;
