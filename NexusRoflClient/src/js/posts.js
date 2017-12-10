$(document).ready(() => {

    const $postList = $("#postList");

    SDK.Post.listOfPosts((err, posts) => {


        posts.forEach((post) => {

            const postsHTML =`
                <tr>
                <td>${post.owner.id}</td>
                <td>${post.content}</td>
                <td>${post.created}</td>
                <td> <button type="button" class="btn btn-success commentPost-button" data-post-id="${post.id}" >Comment the post</button></td>
                <td <button  type="button" class="btn btn-success commentListPosts-button" data-show-post-id="${posts.id}">Show Comment</button> </td>
                </tr>
                `;

            $postList.append(postsHTML)


            $(".commentPost-button").unbind().click(function () {
                const postId =$(this).data("post-id");

                SDK.Storage.persist("postId", postId);

                window.location.href = "../HTML/commentPost.html";

            });

            $(".commentListPosts-button").unbind().click(function () {
                const postId =$(this).data("show-post-id");

                SDK.Storage.persist("postId", postId);

                window.location.href = "../HTML/commentListPosts.html";

            });
        });
    });
});

