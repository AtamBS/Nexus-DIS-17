$(document).ready(() => {

    SDK.User.loadNav();
    const $postList = $("#postList");
    SDK.Event.listOfPosts((err, posts) => {
        posts.forEach(() => {

            const postHTML = `
            <tr>
                <td>${posts.owner.id}</td>
                <td>${posts.event.id}</td>
                <td>${posts.id}</td>
                <td>${posts.content}</td>
                <td> <button class="btn btn-default commentPost-button" data-post-id="${posts.id}">Comment the post</button></td>
            </tr>
         `;
            $postList.append(postHtml);

            $(".commentPost-button").unbind().click(function () {
                const postId =$(this).data("post-id");

                SDK.Storage.persist("postId", postId);

                window.location.href = "commentToPost.html";

            });

        });



    });
});
