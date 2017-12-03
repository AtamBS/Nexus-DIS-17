$(document).ready(() => {

    SDK.User.loadNav();
    const $eventList = $("#eventList");

    SDK.Event.listOfEvents((err, events) => {

        events.forEach((event) => {
            const eventHTML = `
            <tr>
                <td>${event.title}</td>
                <td>${event.created}</td>
                <td>${event.startDate}</td>
                <td>${event.endDate}</td>
                <td>${event.description}</td>
                <td> <button type="button" class="btn btn-success commentEvent-button" data-event-id="${event.id}" >Comment the event</button></td>
           </tr>
        `;
//Append()-metoden indsætter det angivet indhold i slutningen af de valgte elementer.

            $eventList.append(eventHTML);

            $(".commentEvent-button").click(function() {
                const eventId = $(this).data("event-id");
                const event = events.find((event)=> event.id === eventId);

                SDK.Storage.persist("event-id", eventId);

                window.location.href = "../HTML/events.html";

            });
    });


    });
  });



