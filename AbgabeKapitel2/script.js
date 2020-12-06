"use strict";
var characterCreation;
(function (characterCreation) {
    let mainCanvas = document.getElementById("characterGenerator");
    let mainContext = mainCanvas.getContext("2d");
    let optionCanvasArray = [...document.querySelectorAll(".optionCanvas")];
    let optionContextArray = optionCanvasArray.map(canvas => canvas.getContext("2d"));
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
    window.addEventListener("load", () => {
        const storageItem = sessionStorage.getItem("character");
        if (storageItem) {
            const storageCharacter = JSON.parse(storageItem);
            Object.assign(character.head, storageCharacter.head);
            Object.assign(character.torso, storageCharacter.torso);
            Object.assign(character.arms, storageCharacter.arms);
            Object.assign(character.legs, storageCharacter.legs);
        }
        character.draw();
    });
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
                character.arms = armsArray[index];
                character.draw();
            });
        });
        armsArray.forEach((arm, index) => arm.drawOption(optionContextArray[index]));
    }
    function registerLegs() {
        optionCanvasArray.forEach((canvas, index) => {
            canvas.addEventListener("click", () => {
                character.legs = legsArray[index];
                character.draw();
            });
        });
        legsArray.forEach((leg, index) => leg.drawOption(optionContextArray[index]));
    }
    async function dataToServer(_url) {
        let browserCacheData = JSON.parse(sessionStorage.getItem());
        // Code aus Kapitel 2 Praktikumsaufgabe 5:
        let query = new URLSearchParams(browserCacheData);
        url = url + "?" + query.toString();
        await fetch(url);
        displayServerAnswer(text);
    }
    function displayServerAnswer(_serverAnswer) {
        let displayStatus = document.getElementById("serverMessage");
        if (_serverAnswer.confirmation == undefined) {
            displayStatus.textContent = "Server: " + _serverAnswer.confirmation;
            displayStatus.style.color = "19e619";
        }
        else if (_serverAnswer.errorMessage == undefined) {
            displayStatus.textContent = "Server: " + _serverAnswer.errorMessage;
            displayStatus.style.color = "#a02128";
        }
    }
    // https://raw.githubusercontent.com/Moripho/GIS-WiSe-2020-2021/main/AbgabeKapitel2/data.json als url im fetch
    // die ganzen Dateien müssen noch konvertiert werden
})(characterCreation || (characterCreation = {}));
//# sourceMappingURL=script.js.map