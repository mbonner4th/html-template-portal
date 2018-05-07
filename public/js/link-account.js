$(function(){

    var linkAccountForm = $("#link-account-form");
    var errorText = $("#error-text");

    function formDataToJson(serlalizedArray){
        var returnData = {}
        $.map(serlalizedArray, function (value, index){
            returnData[value["name"]] = value["value"];
        });
        return returnData;
    }


    linkAccountForm.on('submit', function(event){
        console.log("hit");
        event.preventDefault();
        formDataJson = formDataToJson($(this).serializeArray());
        errorText.css({"display":"block"});
        $.ajax({
            url: "/users/application",
            data: formDataJson,
            type: 'POST'
        }).done(function(message){
            console.log(message);
            errorText.css({"display":"none"});
        }).fail(function(err){
            console.log(err);
            errorText.css({"display":"block"});
        });
    })

});