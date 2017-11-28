$(document).ready(() => {

    SDK.User.loadNav();
    const $eventList = $("#eventList");

    SDK.Event.listOfEvents((err, events) => {

        events.forEach((event) => {
            const eventHTML = `
            <div class="col-lg-4 book-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${event.title}</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
            <tr>
                <td>${event.title}</td>
                <td>${event.created}</td>
                <td>${event.startDate}</td>
                <td>${event.endDate}</td>
                <td>${event.description}</td>
                <td> <button class="btn btn-default" id="showEvent-button">Show event</button></td>
            </tr>   
            </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${book.price}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success purchase-button" data-book-id="${book.id}">Add to basket</button> 
                        </div>
                    </div>
                </div>
            </div>
        `;
//Append()-metoden indsætter det angivet indhold i slutningen af de valgte elementer.
        $eventList.append(eventHTML)



    });

  });



});