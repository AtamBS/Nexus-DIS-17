$(document).ready(() => {

    SDK.User.loadNav();

    const $userList = $("#userList");

    SDK.User.listOfUsers((err, users) => {
        users.forEach((user) => {

            $userList.append(`  
                    <tr>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.major}</td>
                        <td>${user.semester}</td>
                        <td>${user.description}</td>
                    </tr>
            </div>
            `
            );
        });
    });
});
