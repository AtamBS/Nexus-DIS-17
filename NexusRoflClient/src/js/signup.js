$(document).ready(() => {

    SDK.User.loadNav();

    //Metoden bliver kørt på click af opret-bruger-knappen
    $('#createUserButton').click(() => {
    //Useren er const, så de ikke ændres og desuden optager det færre ressourcer.
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const email = $("#inputEmail").val();
        const gender = $("#inputGender").val();
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const password = $("#inputPassword").val();
        const description = $("#inputDescription").val();

        SDK.User.createUser(password, firstName, lastName, email, description, gender, major, semester, (err, data) => {
            console.log(err, data);
        });

        //Dette er bare en simpel if-else til at sørge for at brugeren ikke glemmer et felt (fejl 40)
        if (!firstName   ||
            !lastName    ||
            !email       ||
            !description ||
            !gender      ||
            !major       ||
            !semester    ||
            !password

        ){ alert('Indtast venligst alle oplysninger');

        } else {

            //Hvis brugeren har indtastet alle oplysninger, så bliver brugeren oprettet.
            window.alert("Bruger oprettet!");
            window.location.href = "../HTML/index.html";

            if (err) {
                return "fejl";
            }
        }
    });
});