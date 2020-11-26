let box = document.querySelector(".box");
createP();
function createP() {
    let p = document.createElement("p");
    p.innerText = "Neuer Paragraph.";
    box.appendChild(p);
    p.addEventListener("click", createP)

}

window.addEventListener("load", handleLoad);

function handleLoad(_event: Event): void {
    console.log(_event);
} 
