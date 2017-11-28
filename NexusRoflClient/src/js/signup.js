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

        SDK.User.createUser(firstName, lastName, email, description, gender, major, password, semester, (err, data) => {
            console.log(err, data);

            if (err) {
                return "failure";
            }
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

        ){ alert('Please fill out all the fields');

        } else {

            //Hvis brugeren har indtastet alle oplysninger, så bliver brugeren oprettet.
            window.alert("User created!");
            window.location.href = "../HTML/index.html";


        }
    });
});