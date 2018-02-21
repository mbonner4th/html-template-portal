$(function(){
    console.log("page loded");

    var shareBtn = $("#share-btn");


    var shareModal = $("#share-modal");
    var loginModal = $("#login-modal-content");
    var tweetModal = $("#tweet-modal-content");
    var loggedOn = false;

    var regForm = $("#registration-form");
    var tweetFrom = $("#new-tweet-form");
    var tweetTextArea = $("#tweet-text-area");
    var tweetURL = $("#tweet-url");
    tweetURL.val(window.location.href);

    var loginFrom = $("#login-form");

    var cancelModalBtn = $("#close-modal-button");


    function closeModal(modal){
        modal.css({"display": "none"});
    };

    function openModal(modal){
        console.log("show Modal");
        modal.css({"display": "block"});
    }

    shareBtn.on('click', function(event){
        console.log("clicked");
        $.ajax({
            method:'GET',
            url: 'http://localhost:4000/user',
            data: {},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true

        }).done(function(user){
            console.log(typeof(user) != 'object');
            if(typeof(user) == 'object'){
                openModal(shareModal);
                openModal(tweetModal);
            } else{
                openModal(loginModal);
            }
            
        
        });

    });

    cancelModalBtn.on('click', function(event){
        console.log("page canceled");
        regForm[0].reset();
        loginFrom[0].reset();
        tweetFrom[0].reset();
        
        closeModal(shareModal);
    });


    regForm.on("submit", function(event){
        event.preventDefault();
        closeModal(loginModal);
        openModal(tweetModal);
    })

    tweetFrom.on('submit', function(event){
        event.preventDefault();
        console.log(tweetTextArea.val());
        var url      = window.location.href;
        console.log(url) 
        closeModal(shareModal);
        // $.ajax({
        //     method:'POST',
        //     url: '/tweets',
        //     data: {
        //         body: tweetTa.val()
        //     }

        // }).done(function(res){
        //     createTweet(res);
        //     tweetFrom[0].reset();
        //     updateCount(0);
        // });
    })

});