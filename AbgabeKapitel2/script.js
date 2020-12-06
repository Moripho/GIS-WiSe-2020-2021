"use strict";
var characterCreation;
(function (characterCreation) {
    let mainCanvas = document.getElementById("characterGenerator");
    let mainContext = mainCanvas.getContext("2d");
    let optionCanvasArray = [...document.querySelectorAll(".optionCanvas")];
    let optionContextArray = optionCanvasArray.map(canvas => canvas.getContext("2d"));
    let resultButton = document.getElementById("resultButton");
    let character;
    let headsArray;
    let torsosArray;
    let armsArray;
    let legsArray;
    class Rect {
        constructor(_posX, _posY, _width, _height, _fillStyle) {
            this.posX = _posX;
            this.posY = _posY;
            this.width = _width;
            this.height = _height;
            this.fillStyle = _fillStyle;
        }
    }
    function drawRect(context, x, y, width, height, fillStyle) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = fillStyle;
        context.fill();
    }
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
            if (resultButton && this.isFullyAssembled()) {
                resultButton.classList.remove("disabled");
                resultButton.addEventListener("click", () => location.href = "index.html");
            }
        }
        isFullyAssembled() {
            return this.head.fillStyle !== "white" &&
                this.torso.fillStyle !== "white" &&
                this.arms.fillStyle !== "white" &&
                this.legs.fillStyle !== "white";
        }
    }
    characterCreation.Character = Character;
    window.addEventListener("load", async () => {
        await loadCharacterData();
        character.draw();
        let currentSite = location.pathname.split("/").pop().replaceAll(".html", "");
        switch (currentSite) {
            case "head":
                registerHeads();
                break;
            case "torso":
                registerTorsos();
                break;
            case "arms":
                registerArms();
                break;
            case "legs":
                registerLegs();
                break;
            case "index":
                if (character.isFullyAssembled())
                    sendCharacterToServer();
        }
    });
    async function loadCharacterData() {
        const response = await fetch("https://raw.githubusercontent.com/Moripho/GIS-WiSe-2020-2021/main/AbgabeKapitel2/data.json");
        const data = await response.json();
        const storageItem = sessionStorage.getItem("character");
        headsArray = data.headsArray.map(head => new Head(head.fillStyle));
        torsosArray = data.torsosArray.map(torso => new Torso(torso.fillStyle));
        armsArray = data.armsArray.map(arms => new Arms(arms.fillStyle));
        legsArray = data.legsArray.map(legs => new Legs(legs.fillStyle));
        const charInfo = storageItem ? JSON.parse(storageItem) : data.character;
        character = new Character(new Head(charInfo.head.fillStyle), new Torso(charInfo.torso.fillStyle), new Arms(charInfo.arms.fillStyle), new Legs(charInfo.legs.fillStyle));
    }
    async function sendCharacterToServer() {
        const displayStatus = document.getElementById("serverMessage");
        const url = "https://gis-communication.herokuapp.com";
        const query = new URLSearchParams({
            head: JSON.stringify(character.head),
            torso: JSON.stringify(character.torso),
            arms: JSON.stringify(character.arms),
            legs: JSON.stringify(character.legs)
        });
        const res = await fetch(url + "?" + query.toString());
        const answer = await res.json();
        displayStatus.innerText = "Server: " + (await answer.message || await answer.error);
        displayStatus.style.color = await answer.message ? "#19e619" : "#a02128";
    }
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
})(characterCreation || (characterCreation = {}));
//# sourceMappingURL=script.js.map