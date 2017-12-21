$(document).ready(() => {

//Når der trykkes på nedenstående knap er det således muligt at lave et post.
    $("#createPost-button").click((e) => {
        e.preventDefault();

        const owner = SDK.User.current();
        const content = $("#inputContent").val();

        SDK.Post.createPost(owner, content, (err, data) => {
            console.log(err, data);

            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Has error");
            }
        });
//Hvis box, hvor man skrive indhold er tom, så vil programmet bede den om, at udfylde box før postet kan blive lavet.
        if (!content) {
            alert("Content empty - Text is required to create a post");
        }

//Hvis postet bliver lavet.
        else {
            window.alert("Post Created");
            window.location.href="../HTML/posts.html";
        }

        });

//Returner brugeren til forsiden.
    $("#return-button").click(() => {
        window.location.href = "../HTML/index.html";
    });

});
