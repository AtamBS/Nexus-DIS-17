$(document).ready(() => {


    $("#commentPost-button").click(() => {
        const owner = SDK.User.current();
        const parent_id =SDK.Storage.load("postId");
        const content = $("#inputContent").val();

        SDK.Post.CommentPosts(owner_id, content, parent_id, (err, data) => {
            if(err && err.xhr.status ==401) {
                $(".form-group").addClass("Has error");

            } else {

                window.location.href="../HTML/posts.html";
            }


        });




    });


});