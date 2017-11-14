const SDK = {
    serverURL: "http://localhost:8080/api",
    request: (options, cb) => {

        let token = {"AUTHORIZATION":localStorage.getItem("token")}

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
        findAll: (cb) => {
            SDK.request({method: "GET", url: "/staffs"}, cb);
        },
        current: () => {
            return SDK.Storage.load("user");
        },
        logOut: () => {
            SDK.Storage.remove("tokenId");
            SDK.Storage.remove("userId");
            SDK.Storage.remove("user");
            window.location.href = "index.html";
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
                if (currentUser) {
                    $(".navbar-right").html(`
            <li><a href="my-page.html">Your orders</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
                } else {
                    $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
                }
                $("#logout-link").click(() => SDK.User.logOut());
                cb && cb();
            });
        }
    },
    Event: {
        addTobasket: (event) => {
            let basket = SDK.Storage.load("basket")

                  //Has anything been added to the basket before?

                  if (!basket) {
                      return SDK.Storage.persist("basket", [{
                          count: 1,
                          event: event

                      }]);
                  }
                  //Does the event already exist?
                  let foundEvent = basket.find(b => b.event.id === event.id);
                  if (foundEvent) {
                      let i = basket.indexOf(foundEvent);
                      basket[i].count++;
                  } else {
                      basket.push({
                          count: 1,
                          event: event
                      });
                  }
                   SDK.Storage.persist("basket", basket);
                   },
            }