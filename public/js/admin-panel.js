$(function(){

    var spanModalBtn = $("#new-page-btn");
    var cancelModalBtn = $("#close-modal-button");
    var newPageModalBtn  = $("#new-page-modal-button");
    var tableBody = $("#admin-table-body");
    var table = $("#admin-table");
    var newPageForm = $("#new-page-form");
    var modal = $("#new-page-modal");

    
    // var quillOptions = {

    //     placeholder: "Page content goes here",
    //     readOnly: false,
    //     theme: 'snow',
    //     modules:{

    //     },
    //   };

    // var quill = new Quill('#editor', quillOptions);

    function closeModal(){
        modal.css({"display": "none"});
        newPageForm[0].reset();

    };

    function openModal(){
        modal.css({"display": "block"});
    }

    spanModalBtn.on('click', function(event){
        console.log("clicked");
        openModal();        
    });

    cancelModalBtn.on('click', function(event){
        console.log("page canceled");
        closeModal();
        
    });



    function formDataToJson(serlalizedArray){
        var returnData = {}
        $.map(serlalizedArray, function (value, index){
            returnData[value["name"]] = value["value"];
        });
        return returnData;
    }

    
    newPageForm.on('submit', function(event){
        event.preventDefault();
        console.log("submitted");
        var pageData = formDataToJson(newPageForm.serializeArray());
        

        // var quillBody = quill.getContents();
        // console.log(quillBody.ops);
        // pageData["quillBody"] = quillBody.ops;
        // pageData["body"] = "ff";
        
        $.ajax({
            method: "POST",
            url: "/edit-page/new-page",
            data: pageData,
        })
        .done(function(pageID){
            closeModal();
            console.log(pageID);
            insertTableRow(pageData, pageID);
        });
    });

    /*how do I get the button to be clickible after page load?? Add click listener to table */
    function insertTableRow(pageData, pageID){
        var created = new Date();
        var hiddenText = pageData.visible ? "" : "hidden" 
       

        var content = 
        `<tr>
            <td class="page-title">
                <a href="/${pageData.url}">${pageData.title}</a>
            </td>
            <td class ="date"><time datetime=${created}>
            ${created.getMonth()}-${created.getDate()}   ${created.getHours()}:${created.getMinutes()}
             </time></td>
            <td>
                <form class="button-form" method="get" action="/edit-page/update-page">
                <input type="hidden" value="${pageID}" name="id"/>
                <button class="icon-button black-button" type="submit">
                    <img class="icon" src='/images/icons/003-edit.svg' alt="Edit Page">
                </button>
            </form>
            <button class="delete-button icon-button black-button" page-id-data="${pageID}">
                <img class="icon" src="/images/icons/001-cancel-button.svg" alt="Delete Page">
            </button>      
            <button class="view-button view icon-button black-button ${hiddenText}" page-id-data="${pageID}" page-visible-data="!${pageData.visible}" type="submit">
                <div class="icon-container icon"></div>
            </button>
                
            </td>
        </tr>`;
        tableBody.append(content);
    }

    /* event deligator for all buttons in table*/
    table.on('click', ".delete-button", function(event){
        var button = $(this);
        var pageId = button.attr('page-id-data');
        $.ajax({
            method:"DELETE",
            url: `/edit-page/${pageId}`
        })
        .done(function(res){
            button.closest("tr").remove();
        });
    });

    table.on("click", ".view-button", function(event){
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