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
    //console.log(JSON.parse(req.body.body));
    var fixedBody = JSON.stringify(req.body.body);
    console.log('new page route route hit');
    if(!req.body.visible){
        checkVisible = true;
    }    
    let newPage = new pageModel({
        title: req.body.title,
        body : fixedBody,
        url: req.body.url,
        author: req.user.email,
        User: req.user,
    });
    newPage.save((err, page)=>{
        if (err){
            console.log(err);
            res.status(500).send({ error: 'Something failed!' })
        } else{
            res.send(page._id);
        }
        
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
    console.log("post update hit");
    if(!req.body.visible){
        checkVisible = false;
    }
    pageModel.updateOne({_id: req.body.id},
        {
            title: req.body.title,
            body : JSON.stringify(req.body.body),
            visible: true,
        })
        .then(function(page){
            console.log("here");
            console.log(page);
            res.status(204).send({"message":"modified"});

        })
        .catch(function(error){
            console.log(error);
            res.status(500).send({"message":error});
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


module.exports = router;