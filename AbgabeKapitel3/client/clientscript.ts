const isLocal: boolean = false;                                                                    // Bei Upload in Cloud Wert als false setzen!
const url: string = isLocal ? "http://localhost:8100" : "https://gissose20202021.herokuapp.com";

function register(): void {
  const fname: HTMLInputElement = <HTMLInputElement>document.getElementById("fname");
  const lname: HTMLInputElement = <HTMLInputElement>document.getElementById("lname");
  const postalCode: HTMLInputElement = <HTMLInputElement>document.getElementById("postalCode");
  const city: HTMLInputElement = <HTMLInputElement>document.getElementById("city");
  const email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
  const password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
  const serverMessage: HTMLElement = <HTMLElement>document.getElementById("serverMessage");

  let data: FormData = new FormData();

  data.append("requestType", "register");
  data.append("fname", fname.value);
  data.append("lname", lname.value);
  data.append("postalCode", postalCode.value);
  data.append("city", city.value);
  data.append("email", email.value);
  data.append("password", password.value);

  talkToServer(serverMessage, data);
}

function login(): void {
  const email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
  const password: HTMLInputElement = <HTMLInputElement>document.getElementById("password");
  const loginMessage: HTMLElement = <HTMLElement>document.getElementById("loginMessage");

  let data: FormData = new FormData();
  data.append("requestType", "login");
  data.append("email", email.value);
  data.append("password", password.value);

  talkToServer(loginMessage, data);
}

function getUsers(): void {
  const listOfNames: HTMLElement = <HTMLElement>document.getElementById("listOfNames");

  let data: FormData = new FormData();
  data.append("requestType", "getUsers");

  talkToServer(listOfNames, data);
}

function talkToServer(element: HTMLElement, data: FormData): void {
  const query: URLSearchParams = new URLSearchParams(<any>data);

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