$(function(){
var adminLink = $("#admin-link");
var signupLink = $("#signup-link");
var logoutLink = $("#logout-link");
    function getUser(){
        $.ajax({
            method:"GET",
            url: "/users"
        }).done(function(user){
            //console.log("stuff")
            if(user){
                signupLink.css("display", "none");
            } else {
                adminLink.css("display", "none")
                logoutLink.css("display", "none");
            }
        })
    }
    getUser();

})