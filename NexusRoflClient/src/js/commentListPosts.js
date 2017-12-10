$(document).ready(() => {

    const $commentListPosts = $("#commentListPosts");

    SDK.Post.listOfCommentPosts(1, (err, post) => {
        console.log(post);
        post.comments.forEach((comment) => {

            const commentsHTML = `

            <tr>
            <td>${comment.owner.id}</td>
            <td>${comment.id}</td>
            <td>${comment.content}</td>
            </tr>
            
    
            `;

            $commentListPosts.append(commentsHTML)
        });

    });
});