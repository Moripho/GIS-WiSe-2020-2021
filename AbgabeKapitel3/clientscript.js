"use strict";
function getData() {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    let data = new FormData();
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    let query = new URLSearchParams(data);
    fetch("https://gissose20202021.herokuapp.com" + "?" + query.toString(), {
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