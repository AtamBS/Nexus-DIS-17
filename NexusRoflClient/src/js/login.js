$(document).ready(() => {

    SDK.User.loadNav();

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");

             //
             alert('Emailen matcher ikke adgangskoden');

            }
            else if (err){
                console.log("Fejl consol")
            } else {
                window.location.href = "index.html";
            }
        });

    });

});
