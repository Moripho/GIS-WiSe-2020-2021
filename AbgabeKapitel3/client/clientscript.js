"use strict";
function getData() {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const postalCode = document.getElementById("postalCode");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let data = new FormData();
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    data.append("postalCode", postalCode.value);
    data.append("city", city.value);
    data.append("email", email.value);
    data.append("password", password.value);
    const query = new URLSearchParams(data);
    const isLocal = true; // Bei Upload in Cloud Wert als false setzen!
    const url = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";
    fetch(url + "?" + query.toString(), {
        method: "GET"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        else {
            console.log(response.url);
        }
    }).catch(console.error);
}
//# sourceMappingURL=clientscript.js.map