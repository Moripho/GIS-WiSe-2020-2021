function getData(): void {
  const fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
  const lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
  const postalCode: HTMLInputElement = <HTMLInputElement>document.getElementById("postalCode");
  const city: HTMLInputElement = <HTMLInputElement>document.getElementById("city");
  const email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
  const password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
  const serverMessage: HTMLElement = <HTMLElement>document.getElementById("serverMessage");

  let data: FormData = new FormData();
  data.append("fname", fname.value);
  data.append("lname", lname.value);
  data.append("postalCode", postalCode.value);
  data.append("city", city.value);
  data.append("email", email.value);
  data.append("password", password.value);

  const query: URLSearchParams = new URLSearchParams(<any>data);
  const isLocal: boolean = false;                                                                    // Bei Upload in Cloud Wert als false setzen!
  const url: string = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";

  fetch(url + "?" + query.toString(), {
    method: "GET"
  })
    .then(response => response.json())
    .then(response => {
      
      serverMessage.innerText = response.message;                                             // Text des displayStatus wird abhängig davon befüllt, ob ein error oder eine erfolgreiche Kommunikation stattgefunden hat. Hierzu wird
      serverMessage.style.color = response.error ? "#a02128" : "#19e619";               // war die Kommunikation erfolgreich, wird die Serverantwort in grün und sonst in rot dargestellt

    })
    .catch(console.error);

  
}

function getUserNames(): void {
  const query: URLSearchParams = new URLSearchParams(<any>data);
  const isLocal: boolean = false;                                                                    // Bei Upload in Cloud Wert als false setzen!
  const url: string = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";

  
}