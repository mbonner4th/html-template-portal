const express = require('express');
const router = express.Router();

const pageModel = require("../models/page");

const template = {
    title: "try a fun name",
    url: "/here",
    body: "put your content here...",
    visible: true,
}

router.get('/new-page', (req, res)=>{
    res.render('new-page', {template} );
});

router.post('/new-page', (req, res)=>{
    let checkVisible = true;
    if(!req.body.visible){
        checkVisible = false;
    }    
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


router.get('/update-page', (req, res)=> {
    pageModel.findOne({_id: req.query.id}, (err, template)=> {
        if (err) {
            console.log(err)
            res.redirect("admin-panel");
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
            res.redirect("admin-panel");
        } else if (response) {
            console.log(response);
            res.redirect(`/${req.body.url}`);
        } else {
            res.render('index', { title: "no page here" });
        }

        });
});


/* PUT and DELETE routes should go here, but mist maake due with HTML ONLY */

router.delete("/:id", (req, res)=>{
    pageModel.findByIdAndRemove({_id: req.params.id.trim()}, (err)=>{
        if (err){
            console.log(err);
        }
        console.log("deleted");
        res.end();
    });
})


router.put("/set-visible", (req, res)=>{
    console.log(req.body);
    pageModel.updateOne(
        {_id: req.body.id,}, 
        {visible: req.body.visible}, 
        (err)=>{
            if (err){
                console.log(err);
            }
    });
    res.end();
});

router.post("/update", (req, res)=>{
    // req.body
});

module.exports = router;