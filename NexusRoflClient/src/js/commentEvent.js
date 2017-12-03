$(document).ready(() => {


    $("#commentToPostBtn").click(() => {
        const owner_id= SDK.Storage.load("currentUserId");
        const parent_id =SDK.Storage.load("postId");
        const content = $("#inputContent").val();

        SDK.Posts.createCommentToPosts(owner_id, content, parent_id, (err, data) => {
            if(err && err.xhr.status ==401) {
                $(".form-group").addClass("Has error");

            } else {


                window.location.href="posts.html";
            }


        });




    });


});