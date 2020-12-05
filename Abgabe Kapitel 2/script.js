"use strict";
var characterCreation;
(function (characterCreation) {
    let mainCanvas = document.getElementById("characterGenerator");
    let mainContext = mainCanvas.getContext("2d");
    let resultButton = document.getElementById("resultButton");
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
    characterCreation.Head = Head;
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
    characterCreation.Torso = Torso;
    class Arms extends Rect {
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
    characterCreation.Arms = Arms;
    class Legs extends Rect {
        constructor(_fillStyle) {
            super(260, 460, 65, 240, _fillStyle);
        }
        drawMain() {
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
            drawRect(mainContext, this.posX + 115, this.posY, this.width, this.height, this.fillStyle);
        }
        drawOption(context) {
            drawRect(context, this.posX - 200, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
            drawRect(context, this.posX - 130, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
        }
    }
    characterCreation.Legs = Legs;
    class Character {
        constructor(_head, _torso, _arms, _legs) {
            this.head = _head;
            this.torso = _torso;
            this.arms = _arms;
            this.legs = _legs;
        }
        draw() {
            sessionStorage.setItem("character", JSON.stringify(character));
            this.head.drawMain();
            this.torso.drawMain();
            this.arms.drawMain();
            this.legs.drawMain();
            if (resultButton && this.head.fillStyle !== "white" && this.torso.fillStyle !== "white" && this.arms.fillStyle !== "white" && this.legs.fillStyle !== "white") {
                resultButton.classList.remove("disabled");
                resultButton.addEventListener("click", () => location.href = "index.html");
            }
        }
    }
    characterCreation.Character = Character;
})(characterCreation || (characterCreation = {}));
//# sourceMappingURL=script.js.map