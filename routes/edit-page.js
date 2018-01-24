const express = require('express');
const router = express.Router();

const pageModel = require("../models/page");

function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/auth');
    } else {
      next();
    }
};

const template = {
    title: "try a fun name",
    url: "/here",
    body: "put your content here...",
    visible: true,
}



router.get('/', (req, res)=>{
    res.render('new-page', {template} );
});

router.get('/update-page', (req, res)=> {
    pageModel.findOne({_id: req.query.id}, (err, template)=> {

        if (err) {
            console.log(err)
            res.redirect("admin-pannel");
        } else if (template) {
            res.render("edit-page", {template});
        } else {
            res.render('index', { title: "no page here" });
        }

    });
});


router.post('/update-page', (req, res)=> {
    let checkVisible = true;
    if(!req.body.visible){
        checkVisible = false;
    }
    console.log(checkVisible);
    pageModel.updateOne({_id: req.body.id},
        {
            title: req.body.title,
            body : req.body.body,
            url: req.body.url,
            visible: checkVisible,

        }, (err, response)=> {

        if (err) {
            console.log(err)
            res.redirect("admin-pannel");
        } else if (response) {
            console.log(response);
            res.redirect(`/${req.body.url}`);
        } else {
            res.render('index', { title: "no page here" });
        }

        });
});

router.post('/new', requireLogin, (req, res)=>{    
    let newPage = new pageModel({
        title: req.body.title,
        body : req.body.body,
        url: req.body.url,
        visible: checkVisible,
        author: req.user.email,
        User: req.user,
    });
    newPage.save((err, page)=>{
        if (err) console.log(err);
        res.redirect("/" + page.url);
    });
});

/* PUT and DELETE routes should go here, but mist maake due with HTML ONLY */
router.post("/del", (req, res)=>{
    console.log(req.body);
    pageModel.findByIdAndRemove({_id: req.body.id}, (err)=>{
        if (err){
            console.log(err);
        }
        console.log("deleted");
    })
    res.redirect("/admin-pannel");
});

router.post("/view", (req, res) =>{

    pageModel.updateOne({_id: req.body.id},{visible: req.body.visible}, (err, doc)=>{
        if (err){
            console.log(err)
        } 
    });
    res.redirect("/admin-pannel");
});

router.post("/update", (req, res)=>{
    req.body
});

module.exports = router;