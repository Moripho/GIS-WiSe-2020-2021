"use strict";
var Character = characterCreation.Character;
var Head = characterCreation.Head;
var Torso = characterCreation.Torso;
var Arms = characterCreation.Arms;
var Legs = characterCreation.Legs;
let headsArray = [new Head("red"), new Head("blue"), new Head("green")];
let torsosArray = [new Torso("red"), new Torso("blue"), new Torso("green")];
let armsArray = [new Arms("red"), new Arms("blue"), new Arms("green")];
let legsArray = [new Legs("red"), new Legs("blue"), new Legs("green")];
let character = new Character(new Head("white"), new Torso("white"), new Arms("white"), new Legs("white"));
let optionCanvasArray = [...document.querySelectorAll(".optionCanvas")];
let optionContextArray = optionCanvasArray.map(canvas => canvas.getContext("2d"));
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
//# sourceMappingURL=data.js.map