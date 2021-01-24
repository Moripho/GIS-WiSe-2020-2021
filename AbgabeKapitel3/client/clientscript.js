"use strict";
function getData() {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const postalCode = document.getElementById("postalCode");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const serverMessage = document.getElementById("serverMessage");
    let data = new FormData();
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    data.append("postalCode", postalCode.value);
    data.append("city", city.value);
    data.append("email", email.value);
    data.append("password", password.value);
    const query = new URLSearchParams(data);
    const isLocal = false; // Bei Upload in Cloud Wert als false setzen!
    const url = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";
    fetch(url + "?" + query.toString(), {
        method: "GET"
    })
        .then(response => response.json())
        .then(response => {
        console.log(response.error);
        console.log(response.message);
        serverMessage.innerText = response.message; // Text des displayStatus wird abhängig davon befüllt, ob ein error oder eine erfolgreiche Kommunikation stattgefunden hat. Hierzu wird
        serverMessage.style.color = response.error ? "#a02128" : "#19e619"; // war die Kommunikation erfolgreich, wird die Serverantwort in grün und sonst in rot dargestellt
    }).catch(console.error);
}
//# sourceMappingURL=clientscript.js.map