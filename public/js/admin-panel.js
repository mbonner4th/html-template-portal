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
}) 