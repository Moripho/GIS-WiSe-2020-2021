
function getData(): void {
    const fname: HTMLInputElement = <HTMLInputElement> document.getElementById("fname");
    const lname: HTMLInputElement = <HTMLInputElement> document.getElementById("lname");
    
    let data: FormData = new FormData();
    data.append("fname", fname.value);
    data.append("lname", lname.value);
    let query: URLSearchParams = new URLSearchParams(<any>data);

  
    fetch("https://gissose20202021.herokuapp.com" + "?" + query.toString(), {
      method: "GET"
    }).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      } else {
          console.log(response.url);
      }
    }).catch(console.error);
  }