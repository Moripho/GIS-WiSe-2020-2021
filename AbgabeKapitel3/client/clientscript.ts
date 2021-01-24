
function getData(): void {
    const fname: HTMLInputElement = <HTMLInputElement> document.getElementById("fname");
    const lname: HTMLInputElement = <HTMLInputElement> document.getElementById("lname");
    const postalCode: HTMLInputElement = <HTMLInputElement> document.getElementById("postalCode");
    const city: HTMLInputElement = <HTMLInputElement> document.getElementById("city");
    const email: HTMLInputElement = <HTMLInputElement> document.getElementById("email");
    const password: HTMLInputElement = <HTMLInputElement> document.getElementById("password");
    
    let data: FormData = new FormData();
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    data.append("postalCode", postalCode.value);
    data.append("city", city.value);
    data.append("email", email.value);
    data.append("password", password.value);

    const query: URLSearchParams = new URLSearchParams(<any>data);
    const isLocal: boolean = true;                                                                    // Bei Upload in Cloud Wert als false setzen!
    const url: string = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";
  
    fetch(url + "?" + query.toString(), {
      method: "GET"
    }).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      } else {
          console.log(response.url);
      }
    }).catch(console.error);
  }