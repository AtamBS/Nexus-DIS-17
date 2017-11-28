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
                <td> <button type="button" class="btn btn-success join-event" id="joinEvent">Join event</button></td>
                
           
        `
        ;
//Append()-metoden indsætter det angivet indhold i slutningen af de valgte elementer.

            $eventList.append(eventHTML)

    });


    });
  });



