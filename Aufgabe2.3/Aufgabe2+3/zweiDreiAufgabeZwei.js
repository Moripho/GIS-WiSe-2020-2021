"use strict";
let mainCanvas = document.getElementById("characterGenerator");
let mainContext = mainCanvas.getContext("2d");
let optionCanvasArray = [...document.querySelectorAll(".optionCanvas")];
let optionContextArray = optionCanvasArray.map(canvas => canvas.getContext("2d"));
class Head {
    constructor(_fillStyle) {
        this.fillStyle = _fillStyle;
    }
    drawMain() {
        mainContext.beginPath();
        mainContext.arc(350, 113, 100, 0, 2 * Math.PI, false);
        mainContext.fillStyle = this.fillStyle;
        mainContext.fill();
    }
    drawOption(context) {
        context.beginPath();
        context.arc(110, 110, 50, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillStyle;
        context.fill();
    }
}
function drawRect(context, x, y, width, height, fillStyle) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = fillStyle;
    context.fill();
}
class Rect {
    constructor(_posX, _posY, _width, _height, _fillStyle) {
        this.posX = _posX;
        this.posY = _posY;
        this.width = _width;
        this.height = _height;
        this.fillStyle = _fillStyle;
    }
}
class Torso extends Rect {
    constructor(_fillStyle) {
        super(305, 222, 190, 300, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 245, this.posY - 187, this.width / 2, this.height / 2, this.fillStyle);
    }
}
class Arm extends Rect {
    constructor(_fillStyle) {
        super(100, 222, 205, 55, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 190, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 82, this.posY - 147, this.width / 2.5, this.height / 2, this.fillStyle);
        drawRect(context, this.posX + 20, this.posY - 147, this.width / 2.5, this.height / 2, this.fillStyle);
    }
}
class Leg extends Rect {
    constructor(_fillStyle) {
        super(305, 522, 65, 238, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 125, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 245, this.posY - 487, this.width / 2, this.height / 2, this.fillStyle);
        drawRect(context, this.posX - 185, this.posY - 487, this.width / 2, this.height / 2, this.fillStyle);
    }
}
class Character {
    draw() {
        this.head.drawMain();
        this.torso.drawMain();
        this.arm.drawMain();
        this.leg.drawMain();
    }
}
let character = new Character();
let headsArray = [new Head("red"), new Head("blue"), new Head("green")];
let torsosArray = [new Torso("red"), new Torso("blue"), new Torso("green")];
let armsArray = [new Arm("red"), new Arm("blue"), new Arm("green")];
let legsArray = [new Leg("red"), new Leg("blue"), new Leg("green")];
function registerHeads() {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.head = headsArray[index];
            character.draw();
        });
    });
    headsArray.forEach((head, index) => head.drawOption(optionContextArray[index]));
}
function registerTorsos() {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.torso = torsosArray[index];
            character.draw();
        });
    });
    torsosArray.forEach((torso, index) => torso.drawOption(optionContextArray[index]));
}
function registerArms() {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.arm = armsArray[index];
            character.draw();
        });
    });
    armsArray.forEach((arm, index) => arm.drawOption(optionContextArray[index]));
}
function registerLegs() {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.leg = legsArray[index];
            character.draw();
        });
    });
    legsArray.forEach((leg, index) => leg.drawOption(optionContextArray[index]));
}
//# sourceMappingURL=zweiDreiAufgabeZwei.js.map