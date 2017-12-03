$(document).ready(() => {


    $("#createPost-button").click((e) => {
        e.preventDefault();

        const owner = SDK.User.current();
        const content = $("#inputContent").val();

        SDK.Post.createPost(owner, content, (err, data) => {
            console.log(err, data);

            if (err && err.xhr.status ==401) {
                $(".form-group").addClass("Has error");
            }
        });

        if (!content) {
            alert("Content empty - Text is required to create a post");
        }
        else {
            window.alert("Post Created");
            window.location.href="../HTML/posts.html";
        }

        });
    $("#return-button").click(() => {
        window.location.href = "../HTML/index.html";
    });

});
