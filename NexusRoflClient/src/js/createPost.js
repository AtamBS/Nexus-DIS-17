$(document).ready(() => {

    SDK.User.loadNav();

    $("#createPost-button").click(() => {
        const ownerId = localStorage.getItem("UserId");
        const eventId = localStorage.getItem("event-id");
        const postId = localStorage.getItem("post_id");
        const content = $("#inputContent").val();

        SDK.Post.createPost(ownerId, content, eventId, postId, (err, data) => {
           /* if (err && err.xhr.status == 401) {
                $(".form-group").addClass("Has error");

            } else {
                window.alert("Post created!");
                window.location.href = "../HTML/posts.html";
            }
            $("#return-button").click(() => {
                window.location.href = "../HTML/index.html";

            });

*/
        });


    });

});
    /*
$("#createPost-button").click(() => {

    const owner = SDK.Storage.load("userId");
    const content = $("#inputNewPost").val();
    const eventId = SDK.Storage.load("chosenEventId");
    const owner_id = SDK.User.current();

    SDK.Post.createPost(owner, content, eventId, (err, data) => {

    });

    window.alert("Post created!");
});
    $("#return-button").click(() => {
        window.location.href = "../HTML/index.html";
    });
});
    */
