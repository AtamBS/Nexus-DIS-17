// I SDK'en ligger alle metoder, som kommunikerer med databasen eller bruges i flere metoder på klienten.
// Koden her tager inspireret af Jesper Bruun Hansens kode, som er tilgængeligt på Gitbub.

const SDK = {
    serverURL: "Https://localhost:8443/api",
    request: (options, cb) => {

        let token = {"AUTHORIZATION": localStorage.getItem("token")}

// AJAX kald er en webudviklingsteknik, som her sætter parametrene for kommunikationen med serveren.
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: token,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),

            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    User: {

//Opretter en bruger
        createUser: (firstName, lastName, email, description, gender, major, password, semester, cb) => {
            SDK.request({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    gender: gender,
                    major: major,
                    semester: semester,
                    password: password,
                    description: description
                },
                url: "/users",
                method: "POST"
            }, cb)
        },

//Sætter specifik bruger ved brug af user-objektet i localStorage.
        current: () => {
            return localStorage.getItem("userId");
        },

//Lister alle brugere af Cafe Nexus.
        listOfUsers: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                },
                cb);
        },
//Metode til at logge ud, som tager token, userID og tilsidst useren ud af programmet.
        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "../HTML/login.html";
        },

//Login-metode

        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/auth",
                method: "POST"
            }, (err, data) => {


                if (err) return cb(err);

// Inspiration fra følgende IP-adresse: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript

                let token = data;

                var base64Url = token.split('.')[0];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                console.log(JSON.parse(window.atob(base64)));

                localStorage.setItem("userId", JSON.parse(window.atob(base64)).kid);
                localStorage.setItem("token", data);


                cb(null, data);

            }, cb);
        },

//Loader brugermenuen i toppen af programmet.
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();

                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },


    Event: {

//Laver et event.

        createEvent: (owner_id, title, startDate, endDate, description, cb) => {
            SDK.request({
                data: {
                    owner_id: owner_id,
                    title: title,
                    startDate: startDate,
                    endDate: endDate,
                    description: description
                },
                url: "/events",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },

//Liste af alle oprettet events.

        listOfEvents: (cb) => {
            SDK.request({

                method: "GET",
                url: "/events",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                },
            }, cb)
        },

    },

    Post: {

//Laver et post.

        createPost: (owner, content, post_id, cb) => {
            SDK.request({
                data: {
                    owner: owner,
                    content: content,
                    post: post_id,

                },
                url: "/posts",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)

        },

//Liste over alle posts.

        listOfPosts: (cb) =>{
            SDK.request({
                method: "GET",
                url: "/posts",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }

            }, cb)

        },

//Kommenter et post.

        commentPosts: (owner, content,parent_id, cb) => {
            SDK.request({
                data: {
                    owner: owner,
                    content: content,
                    parent: parent_id
                },
                method: "POST",
                url: "/posts",
            }, cb);

        },

//Liste over alle kommentarer til posts.

        listOfCommentPosts: (id, cb) =>{
            SDK.request({
                method: "GET",
                url: "/posts/" +id,
                headers: {
                    Authorization: "Bearer" + SDK.Storage.load("post_id")
                },
             },cb)

        },
    },

//!!!!!!

    Storage: {
            prefix: "CafeNexusSDK", //Prefix for at det ikke bliver overwritet af andre med samme navn.
            persist: (key, value) => {
                window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
            },
            load: (key) => {
                const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return val;
                }
            },
            remove: (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
        }

};


