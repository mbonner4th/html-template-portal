$(function(){
    console.log('loaded');

    var jsonBody = $("#json-body");

    var container = document.getElementById('jsoneditor');
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
    // console.log(jsonBody.val());
    var json = jsonBody.val();
   var editor = new JSONEditor(container, options, json);
})