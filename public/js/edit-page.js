$(function(){
    var jsonBody = $("#json-body");
    var editPageForm = $("#edit-page-form");
    var newPageForm = $("#new-page-form");
    var urlError = $("#error-text");
    var container = document.getElementById('jsoneditor'); // this lib seems to require elements grabbed this way

    /* ====== Start of JSON editor logic === */
    /* https://github.com/josdejong/jsoneditor */
    var options = {
      mode: 'code',
      modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
      onError: function (err) {
        alert(err.toString());
      },
      onModeChange: function (newMode, oldMode) {
        console.log('Mode switched from', oldMode, 'to', newMode);
      }
    };
    if(jsonBody.val()){
        var json = JSON.parse(jsonBody.val());
    } else{
        var json = {"actions":[{}]}
    }
    
   var editor = new JSONEditor(container, options, json);

   //

   function formDataToJson(serlalizedArray){
    var returnData = {}
    $.map(serlalizedArray, function (value, index){
        returnData[value["name"]] = value["value"];
    });
    return returnData;
    }

    //Takes serized form data, appends the data from the JSON editor, and 
    //returns the whole object as a JSON string
    function formEditorDataToJsonString(formJson){
        editor.get();
        formJson["body"] = editor.get();
        return JSON.stringify(formJson);
    }

    editPageForm.on("submit", function(event){
        event.preventDefault();
        formDataJson = formDataToJson($(this).serializeArray());
        myData = formEditorDataToJsonString(formDataJson);
        $.ajax({
            url: '/edit-page/update-page',
            data: myData,
            contentType: "application/json",
            type: 'POST'
          }).done(function(message){
              window.location.replace("/" + formDataJson['url'])
          }).fail(function(err){
                console.log(err);
          });
    });

    newPageForm.on("submit", function(event){
        event.preventDefault();
        formDataJson = formDataToJson($(this).serializeArray());
        myData = formEditorDataToJsonString(formDataJson);
        $.ajax({
            url: '/edit-page/new-page',
            data: myData,
            contentType: "application/json",
            type: 'POST'
          }).done(function(message){  
              urlError.css({"display": "none"});
              window.location.replace("/admin-pannel");
          }).fail(function(err){
                console.log(err);
                urlError.css({"display": "block"});
          });

    });


})