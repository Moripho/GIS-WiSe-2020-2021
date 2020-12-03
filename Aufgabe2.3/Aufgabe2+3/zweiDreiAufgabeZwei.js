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
        mainContext.arc(350, 100, 100, 0, 2 * Math.PI, false);
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
        super(260, 200, 180, 260, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 200, this.posY - 157, this.width / 2, this.height / 2, this.fillStyle);
    }
}
class Arm extends Rect {
    constructor(_fillStyle) {
        super(39, 200, 221, 51, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 401, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 10, this.posY - 127, this.width / 3, this.height / 2, this.fillStyle);
        drawRect(context, this.posX + 80, this.posY - 127, this.width / 3, this.height / 2, this.fillStyle);
    }
}
class Leg extends Rect {
    constructor(_fillStyle) {
        super(260, 460, 65, 240, _fillStyle);
    }
    drawMain() {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 125, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context) {
        drawRect(context, this.posX - 200, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
        drawRect(context, this.posX - 130, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
    }
}
class Character {
    draw() {
        if (this.torso == undefined && this.arm == undefined && this.leg == undefined) {
            this.head.drawMain();
        }
        else if (this.head == undefined && this.arm == undefined && this.leg == undefined) {
            this.torso.drawMain();
        }
        else if (this.head == undefined && this.torso == undefined && this.leg == undefined) {
            this.arm.drawMain();
        }
        else if (this.head == undefined && this.torso == undefined && this.arm == undefined) {
            this.leg.drawMain();
        }
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