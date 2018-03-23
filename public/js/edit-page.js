$(function(){
    console.log('loaded');

    var jsonBody = $("#json-body");
    var newPageForm = $("#new-page-form");
    var container = document.getElementById('jsoneditor'); // this lib seems to require elements grabbed this way

    /* ====== Start of JSON editor logic === */
    /* https://github.com/josdejong/jsoneditor */
    // removes white space and special characters
    var cleanJson = function(json){
        /* */
        return json.replace(/\s/g, '').replace(/\\/g, '');
    }
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
    console.log();
    var json = JSON.parse(jsonBody.val());
   var editor = new JSONEditor(container, options, json);

   //

   function formDataToJson(serlalizedArray){
    var returnData = {}
    $.map(serlalizedArray, function (value, index){
        returnData[value["name"]] = value["value"];
    });
    return returnData;
    }

    newPageForm.on("submit", function(event){
        event.preventDefault();
        editor.get();
        
        var formJson = formDataToJson($(this).serializeArray());
        formJson["body"] = editor.get();

        $.ajax({
            url: '/edit-page/update-page',
            data: JSON.stringify(formJson),
            contentType: "application/json",
            type: 'POST'
          }).done(function(message){
              console.log(message)
          }).fail(function(err){
                console.log(err);
          });
    });


})