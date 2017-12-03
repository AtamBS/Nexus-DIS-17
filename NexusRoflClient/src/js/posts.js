$(document).ready(() => {

    const $postList = $("#postList");

    SDK.Post.listOfPosts((err, posts) =>{

        console.log(JSON.stringify(posts));


        posts.forEach((post) =>{
            const postsHTML =`
                <tr>
                <td>${post.owner}</td>
                <td>${post.content}</td>
                <td>${post.created}</td>
                <td> <button type="button" class="btn btn-success commentPost-button" data-post-id="${post.id}" >Comment the post</button></td>
                </tr>
                `;

            $postList.append(postsHTML)


            $(".commentPost-button").unbind().click(function () {
                const postId =$(this).data("post-id");

                SDK.Storage.persist("postId", postId);

                window.location.href = "commentToPost.html";

            });
        });
    });
});

