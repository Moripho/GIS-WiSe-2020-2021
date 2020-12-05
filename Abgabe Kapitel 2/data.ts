import Character = characterCreation.Character;
import Head = characterCreation.Head;
import Torso = characterCreation.Torso;
import Arms = characterCreation.Arms;
import Legs = characterCreation.Legs;




let headsArray: Head[] = [new Head("red"), new Head("blue"), new Head("green")];
let torsosArray: Torso[] = [new Torso("red"), new Torso("blue"), new Torso("green")];
let armsArray: Arms[] = [new Arms("red"), new Arms("blue"), new Arms("green")];
let legsArray: Legs[] = [new Legs("red"), new Legs("blue"), new Legs("green")];

let character: Character = new Character(new Head("white"), new Torso("white"), new Arms("white"), new Legs("white"));

let optionCanvasArray: HTMLCanvasElement[] = <HTMLCanvasElement[]>[...document.querySelectorAll(".optionCanvas")];
let optionContextArray: CanvasRenderingContext2D[] = optionCanvasArray.map(canvas => canvas.getContext("2d"));

window.addEventListener("load", () => {
    const storageItem: string = sessionStorage.getItem("character");
    if (storageItem) {
        const storageCharacter: Character = JSON.parse(storageItem) as Character;
        Object.assign(character.head, storageCharacter.head);
        Object.assign(character.torso, storageCharacter.torso);
        Object.assign(character.arms, storageCharacter.arms);
        Object.assign(character.legs, storageCharacter.legs);
    }
    character.draw();
});

function registerHeads(): void {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.head = headsArray[index];
            character.draw();
        });
    });

    headsArray.forEach((head, index) => head.drawOption(optionContextArray[index]));
}

function registerTorsos(): void {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.torso = torsosArray[index];
            character.draw();
        });
    });

    torsosArray.forEach((torso, index) => torso.drawOption(optionContextArray[index]));
}

function registerArms(): void {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.arms = armsArray[index];
            character.draw();
        });
    });

    armsArray.forEach((arm, index) => arm.drawOption(optionContextArray[index]));
}

function registerLegs(): void {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.legs = legsArray[index];
            character.draw();
        });
    });

    legsArray.forEach((leg, index) => leg.drawOption(optionContextArray[index]));
}