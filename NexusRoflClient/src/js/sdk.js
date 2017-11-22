const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let token = {"AUTHORIZATION": localStorage.getItem("token")}

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

        findAll: (cb) => {
            SDK.request({
                    method: "GET",
                    url: "/users"

                },
                cb);
        },
        current: () => {
            return SDK.Storage.load("userId");
        },

        logOut: () => {
            SDK.Storage.remove("token");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "../HTML/index.html";
        },
        login: (email, password, cb) => {
            SDK.request({
                data: {
                    email: email,
                    password: password
                },
                url: "/auth",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) return cb(err);
                /*
                                SDK.Storage.persist("tokenId", data.id);
                                SDK.Storage.persist("userId", data.userId);
                                SDK.Storage.persist("user", data.user);
                */
                localStorage.setItem("token", data);
                cb(null, data);

            });
        },
        loadNav: (cb) => {
            $("#nav-container").load("nav.html", () => {
                const currentUser = SDK.User.current();

                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },

    //Følgende metoder bliver tilgængelige, når man er logget ind som bruger.
    Event: {
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
        findAllEvents: (cb) => {
            SDK.request({

                method: "GET",
                url: "/events",
                headers: {
                    Authorization: "Bearer " + SDK.Storage.load("token")
                }
            }, cb)
        },
    },


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


