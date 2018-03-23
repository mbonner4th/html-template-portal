$(function(){
    console.log("content-page.js is loaded");

    var jsonBody = $("#json-body");
    var container = document.getElementById('jsoneditor'); // this lib seems to require elements grabbed this way

    var options = {
    mode: 'code',
    modes: ['code', 'text', 'view'], // allowed modes
    onEditable: function(node){
        if(!node.path) {
            return false;
        }
    },
    onError: function (err) {
        console.log(err.toString());
    },
    onModeChange: function (newMode, oldMode) {
        console.log('Mode switched from', oldMode, 'to', newMode);
    }
    };
    

    var json = JSON.parse(jsonBody.val());
    var editor = new JSONEditor(container, options, json);
})