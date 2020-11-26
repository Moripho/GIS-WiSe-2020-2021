"use strict";
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
//Aufgabe 3 a)
context.beginPath();
context.rect(0, 500, 1000, 200);
context.fillStyle = "yellow";
context.fill();
context.lineWidth = 20;
context.strokeStyle = "black";
context.stroke();
//Aufgabe 3 b) + c)
class Rect {
    constructor(_width, _height, _x, _y, _color) {
        this.width = _width || Math.random() * 100;
        this.height = _height || Math.random() * 100;
        this.x = _x || Math.random() * 100;
        this.y = _y || Math.random() * 100;
        this.color = _color || "#000";
    }
}
//Aufgabe 3 d)
function drawRect(_rect) {
    console.log(_rect);
    context.beginPath();
    context.rect(_rect.x, _rect.y, _rect.width, _rect.height);
    context.fillStyle = _rect.color;
    context.fill();
}
// drawRect(new Rect());
//Aufgabe 3 e)
let rectArray = [new Rect(), new Rect(undefined, undefined, undefined, undefined, "#00ff00"), new Rect(50, 50, 150, 140, "#ff0000")]; //Testwerte
rectArray.forEach(rect => drawRect(rect));
//# sourceMappingURL=uebungCanvas.js.map