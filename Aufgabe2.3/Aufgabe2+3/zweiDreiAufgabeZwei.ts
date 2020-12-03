let mainCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("characterGenerator");
let mainContext: CanvasRenderingContext2D = mainCanvas.getContext("2d");

let optionCanvasArray: HTMLCanvasElement[] = <HTMLCanvasElement[]>[...document.querySelectorAll(".optionCanvas")];
let optionContextArray: CanvasRenderingContext2D[] = optionCanvasArray.map(canvas => canvas.getContext("2d"));

class Head {
    // Kopf mit Canvas Arc:
    fillStyle: string; // abhängig von context.fillStyle = "hexcode" + context.fill();

    constructor(_fillStyle: string) {
        this.fillStyle = _fillStyle;
    }
    drawMain(): void {
        mainContext.beginPath();
        mainContext.arc(350, 113, 100, 0, 2 * Math.PI, false);
        mainContext.fillStyle = this.fillStyle;
        mainContext.fill();
    }
    drawOption(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.arc(110, 110, 50, 0, 2 * Math.PI, false);
        context.fillStyle = this.fillStyle;
        context.fill();
    }
}

function drawRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillStyle: string): void {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = fillStyle;
    context.fill();
}

class Rect {

    posX: number;
    posY: number;
    width: number;
    height: number;
    fillStyle: string;

    constructor(_posX: number, _posY: number, _width: number, _height: number, _fillStyle: string) {
        this.posX = _posX;
        this.posY = _posY;
        this.width = _width;
        this.height = _height;
        this.fillStyle = _fillStyle;
    }

}

class Torso extends Rect {
    constructor(_fillStyle: string) {
        super(305, 222, 190, 300, _fillStyle);
    }
    drawMain(): void {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
    }
    drawOption(context: CanvasRenderingContext2D): void {
        drawRect(context, this.posX - 245, this.posY - 187, this.width / 2, this.height / 2, this.fillStyle);
    }
}

class Arm extends Rect {
    constructor(_fillStyle: string) {
        super(100, 222, 205, 55, _fillStyle);
    }
    drawMain(): void {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 190, this.posY, this.width, this.height, this.fillStyle);
    }

    drawOption(context: CanvasRenderingContext2D): void {
        drawRect(context, this.posX, this.posY, this.width / 2, this.height / 2, this.fillStyle);
        drawRect(context, this.posX, this.posY - 187, this.width / 2, this.height / 2, this.fillStyle);
    }
}

class Leg extends Rect {
    constructor(_fillStyle: string) {
        super(305, 522, 65, 238, _fillStyle);
    }

    drawMain(): void {
        drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        drawRect(mainContext, this.posX + 125, this.posY, this.width, this.height, this.fillStyle);
    }

    drawOption(context: CanvasRenderingContext2D): void {
        drawRect(context, this.posX - 245, this.posY - 487, this.width / 2, this.height / 2, this.fillStyle);
        drawRect(context, this.posX - 185, this.posY - 487, this.width / 2, this.height / 2, this.fillStyle);
    }
}

class Character {
    head: Head;
    torso: Torso;
    arm: Arm;
    leg: Leg;

    draw(): void {
        this.head.drawMain();
        this.torso.drawMain();
        this.arm.drawMain();
        this.leg.drawMain();
    }
}

let character: Character = new Character();

let headsArray: Head[] = [new Head("red"), new Head("blue"), new Head("green")];
let torsosArray: Torso[] = [new Torso("red"), new Torso("blue"), new Torso("green")];
let armsArray: Arm[] = [new Arm("red"), new Arm("blue"), new Arm("green")];
let legsArray: Leg[] = [new Leg("red"), new Leg("blue"), new Leg("green")];

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
            character.arm = armsArray[index];
            character.draw();
        });
    });

    armsArray.forEach((arm, index) => arm.drawOption(optionContextArray[index]));
}

function registerLegs(): void {
    optionCanvasArray.forEach((canvas, index) => {
        canvas.addEventListener("click", () => {
            character.leg = legsArray[index];
            character.draw();
        });
    });

    legsArray.forEach((leg, index) => leg.drawOption(optionContextArray[index]));
}

