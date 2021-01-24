"use strict";
const isLocal = false; // Bei Upload in Cloud Wert als false setzen!
const url = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";
function register() {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const postalCode = document.getElementById("postalCode");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const serverMessage = document.getElementById("serverMessage");
    let data = new FormData();
    data.append("requestType", "register");
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    data.append("postalCode", postalCode.value);
    data.append("city", city.value);
    data.append("email", email.value);
    data.append("password", password.value);
    talkToServer(serverMessage, data);
}
function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginMessage = document.getElementById("loginMessage");
    let data = new FormData();
    data.append("requestType", "login");
    data.append("email", email.value);
    data.append("password", password.value);
    talkToServer(loginMessage, data);
}
function getUsers() {
    const listOfNames = document.getElementById("listOfNames");
    let data = new FormData();
    data.append("requestType", "getUsers");
    talkToServer(listOfNames, data);
}
function talkToServer(element, data) {
    const query = new URLSearchParams(data);
    fetch(url + "?" + query.toString(), {
        method: "GET"
    })
        .then(response => response.json())
        .then(response => {
        element.innerText = response.message;
        element.style.color = response.error ? "#a02128" : "#19e619";
    })
        .catch(console.error);
}
//# sourceMappingURL=clientscript.js.map