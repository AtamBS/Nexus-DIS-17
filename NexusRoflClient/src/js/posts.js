$(document).ready(() => {

    const $postTable = $("#postTable");

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

            $postTable.append(postsHTML)

        });
    });
});

