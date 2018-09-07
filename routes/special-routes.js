var express = require('express');
var router = express.Router();



router.post('/no-response', function(req, res){
    console.log("POST no-response route: ", req.body)
    // res.sendStatus(200);
});
router.get('/no-response', function(req, res){
    console.log("GET no-response route")
    // res.sendStatus(200);
});

router.post("/timeout/:timeoutValue", function(req, res){
    console.log("special timeout: ", req.params.timeoutValue);
    setTimeout(()=>{
        res.send(
            {
                "actions": [
                  {
                    "type": "SAY",
                    "params": {
                      "text": "Timeout route"
                    }
                  },
                  {
                    "type": "HANGUP"
                  }
                ]
              }
        )
    }, req.params.timeoutValue);
});

router.get("/timeout/:timeoutValue", function(req, res){
    console.log("special timeout: ", req.params.timeoutValue);
    setTimeout(()=>{
        res.send(
            {
                "actions": [
                  {
                    "type": "SAY",
                    "params": {
                      "text": "Timeout route"
                    }
                  },
                  {
                    "type": "HANGUP"
                  }
                ]
              }
        )
    }, req.params.timeoutValue);
});


module.exports = router;