$(function(){

    var shareBtn = $("#share-btn");


    var shareModal = $("#share-modal");
    var loginModal = $("#login-modal-content");
    var tweetModal = $("#tweet-modal-content");
    var loggedOn = false;

    var regForm = $("#registration-form");
    var loginForm =$("#login-form");
    var tweetFrom = $("#new-tweet-form");
    var tweetTextArea = $("#tweet-text-area");
    var tweetURL = $("#tweet-url");
    tweetURL.val(window.location.href);

    var loginFrom = $("#login-form");

    var cancelModalBtn = $("#calncel-btn");


    function closeModal(modal){
        modal.css({"display": "none"});
    };

    function openModal(modal){
        modal.css({"display": "block"});
    }

    shareBtn.on('click', function(event){
        $.ajax({
            method:'GET',
            url: 'http://localhost:4000/user',
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true

        }).done(function(user){
            if(typeof(user) == 'object'){
                openModal(shareModal);
                openModal(tweetModal);
            } else{
                openModal(shareModal);
                openModal(loginModal);
            }
            
        
        });

    });

    cancelModalBtn.on('click', function(event){
        console.log("canceled")
        regForm[0].reset();
        loginFrom[0].reset();
        tweetFrom[0].reset();
        closeModal(loginModal);
        closeModal(tweetModal);
        closeModal(shareModal);
    });

    function formDataToJson(serlalizedArray){
        var returnData = {}
        $.map(serlalizedArray, function (value, index){
            returnData[value["name"]] = value["value"];
        });
        return returnData;
    }

    regForm.on("submit", function(event){
        event.preventDefault();
        console.log(formDataToJson(regForm.serializeArray()));
        $.ajax({
            method:'POST',
            url: 'http://localhost:4000/user/register',
            data: formDataToJson(regForm.serializeArray()),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        }).done(function(user){
            closeModal(loginModal);
            openModal(tweetModal);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(textStatus);
            console.log(errorThrown);
        })
    })

    loginForm.on("submit", function(event){
        event.preventDefault();
        console.log(formDataToJson(loginForm.serializeArray()));
        $.ajax({
            method:'POST',
            url: 'http://localhost:4000/user/login',
            data: formDataToJson(loginForm.serializeArray()),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true
        }).done(function(user){
            closeModal(loginModal);
            openModal(tweetModal);
        })
    })
    tweetFrom.on('submit', function(event){
        event.preventDefault();
        var url      = window.location.href;
        var urlString = `<a href=${url}>${url}</a><br/>`;
        var fullTweet = urlString + tweetTextArea.val();
        closeModal(shareModal);
        $.ajax({
            method:'POST',
            url: 'http://localhost:4000/tweets',
            data: {
                body: fullTweet
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,

        }).done(function(res){
            console.log(res);
            closeModal(shareModal);
            //createTweet(res);
            //tweetFrom[0].reset();
            //updateCount(0);
        });
    })

});