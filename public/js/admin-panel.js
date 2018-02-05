$(function(){

    $(".delete-button").on('click', function(event){
        var button = $(this);
        var pageId = button.attr('page-id-data');
        $.ajax({
            method:"DELETE",
            url: `/edit-page/${pageId}`
        })
        .done(function(res){
            console.log('done');
            button.closest("tr").remove();

        });
    });

    // $(".view-button").addClass($(this).attr("page-visible-data")? "":"hidden");
    $( ".view-button" ).each(function() {
        var pageVisible =$(this).attr("page-visible-data") =="true";
        $( this ).addClass( pageVisible ? "hidden": "visible" );
        console.log(pageVisible ==true);
      });
       
    $(".view-button").on("click", function(event){
        var button = $(this);
        var pageId = button.attr("page-id-data");
        var pageVisible = button.attr("page-visible-data") =="true"; // implicityly changes type from string to bool
        $.ajax({
            method:"PUT",
            url: "/edit-page/set-visible",
            data: {
                id: pageId, 
                visible: pageVisible,
            },
        })
        .done(function(res){
            button.addClass(pageVisible ? "hidden": "");
            if(!pageVisible){
                button.addClass("hidden");
            }else{
                button.removeClass("hidden");
            }
            button.attr("page-visible-data", !pageVisible);
        })
    });

        // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = $("#new-page-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}) 