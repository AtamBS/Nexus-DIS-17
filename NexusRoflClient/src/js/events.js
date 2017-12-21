//Liste over alle events.
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
           </tr>
        `;
//Append()-metoden indsætter det angivet indhold i slutningen af de valgte elementer.

            $eventList.append(eventHTML);

         });
    });
});



