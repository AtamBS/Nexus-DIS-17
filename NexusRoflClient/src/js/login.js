$(document).ready(() => {

    SDK.User.loadNav();

    $("#login-button").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        SDK.User.login(email, password, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error");

//jeps.. Okay jamen. Så var det vist alt :) . Mange mange tak morten, som sagt så skylder jeg dig en øl eller ethundrede
                // Haha, kanon! Det kommer jeg nok til at holde dig op på, på et tidspunkt ;-). Held og lykke til eksamen :-)
                // Tak! You have my word! Efter eksamen giver jeg en stor omgang! Kanon!
            }
            else if (err){
                console.log("Fejl consol")
            } else {
                window.location.href = "index.html";
            }
        });

    });

});
