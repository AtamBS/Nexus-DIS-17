//Metode til at lave et event.
$(document).ready(() => {

    SDK.User.loadNav();
    //Events'ne er const, så de ikke ændres og desuden optager det færre ressourcer.
    $("#create-button").click(() => {
        const title = $("#inputTitle").val();
        const startDate = $("#inputStartDate").val();
        const endDate = $("#inputEndDate").val();
        const description = $("#inputDescription").val();
        const owner_id = SDK.User.current();

        SDK.Event.createEvent(owner_id, title, startDate, endDate, description, (err, data)=> {
        });

        window.alert("Event created!");
        });

        $("#return-button").click(() => {

        window.location.href = "events.html";
        });
});