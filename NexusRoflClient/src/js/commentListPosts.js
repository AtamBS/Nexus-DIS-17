$(document).ready(() => {

    const $commentListPosts = $("#commentListPosts");

    SDK.Post.listOfCommentPosts((err, post) => {

        post.forEach((post) => {

            const commentsHTML = `

            <tr>
            <td>${post.owner.id}</td>
            <td>${post.id}</td>
            <td>${post.content}</td>
            </tr>
            
    
            `;

            $commentListPosts.append(commentsHTML)
        });

    });
});