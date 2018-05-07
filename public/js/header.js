$(function(){

    function showElem(){
    }

    function hideElem(){
    }
    function getUser(){
        $.ajax({
            method:"GET",
            url: "/users"
        }).done(function(user){
            if(user){
                $(".logged-in").css("display","inline");
            } else {
                $(".logged-out").css("display", "inline");
            }
        })
    }
    getUser();
})