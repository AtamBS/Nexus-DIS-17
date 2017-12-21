$(document).ready(() => {

//Når knappen trykkes oprettes der en kommentar på det specifikke post.
    $("#commentPost-button").click(() => {
        const owner = SDK.User.current();
        const content = $("#inputContent").val();
        const parent_id =SDK.Storage.load("postId");

        SDK.Post.commentPosts(owner, content, parent_id, (err, data) => {
            if(err && err.xhr.status === 401) {
                $(".form-group").addClass("Has error");

            } else {

                window.location.href="../HTML/posts.html";
            }

        });

    });
    $("#return-button").click(() => {
        window.location.href = "../HTML/index.html";
    });

});