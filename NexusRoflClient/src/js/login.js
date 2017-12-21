$(document).ready(() => {

    SDK.User.loadNav();
//Login-metoden bliver kørt, hvis man trykker på login-knappen.
    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();
//Login-metode der tager email og password som parametre.
        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");

            else if (err){
                console.log("Fejl consol")
            } else {
                window.location.href = "index.html";
            }
        });

    });

});

