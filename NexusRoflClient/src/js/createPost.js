$("#newPost-button").click(function () {

    const ownerId = SDK.Storage.load("userId");
    const content = $("#inputNewPost").val();
    const eventId = SDK.Storage.load("chosenEventId");

    SDK.Post.createPost(ownerId, content, eventId, (err, data) => {


    });

    window.location.href = "specific-event.html";


});