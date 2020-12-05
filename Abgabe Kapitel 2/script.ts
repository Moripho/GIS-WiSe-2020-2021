namespace characterCreation {
    let mainCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("characterGenerator");
    let mainContext: CanvasRenderingContext2D = mainCanvas.getContext("2d");

    let resultButton: HTMLElement = document.getElementById("resultButton");



    export class Head {
        fillStyle: string;

        constructor(_fillStyle: string) {
            this.fillStyle = _fillStyle;
        }
        drawMain(): void {
            mainContext.beginPath();
            mainContext.arc(350, 100, 100, 0, 2 * Math.PI, false);
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

    export class Torso extends Rect {
        constructor(_fillStyle: string) {
            super(260, 200, 180, 260, _fillStyle);
        }
        drawMain(): void {
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
        }
        drawOption(context: CanvasRenderingContext2D): void {
            drawRect(context, this.posX - 200, this.posY - 157, this.width / 2, this.height / 2, this.fillStyle);
        }
    }

    export class Arms extends Rect {
        constructor(_fillStyle: string) {
            super(39, 200, 221, 51, _fillStyle);
        }
        drawMain(): void {
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
            drawRect(mainContext, this.posX + 401, this.posY, this.width, this.height, this.fillStyle);
        }

        drawOption(context: CanvasRenderingContext2D): void {
            drawRect(context, this.posX - 10, this.posY - 127, this.width / 3, this.height / 2, this.fillStyle);
            drawRect(context, this.posX + 80, this.posY - 127, this.width / 3, this.height / 2, this.fillStyle);
        }
    }

    export class Legs extends Rect {
        constructor(_fillStyle: string) {
            super(260, 460, 65, 240, _fillStyle);
        }

        drawMain(): void {
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle);
            drawRect(mainContext, this.posX + 115, this.posY, this.width, this.height, this.fillStyle);
        }

        drawOption(context: CanvasRenderingContext2D): void {
            drawRect(context, this.posX - 200, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
            drawRect(context, this.posX - 130, this.posY - 415, this.width / 2, this.height / 2, this.fillStyle);
        }
    }

    export class Character {
        head: Head;
        torso: Torso;
        arms: Arms;
        legs: Legs;

        constructor(_head: Head, _torso: Torso, _arms: Arms, _legs: Legs) {
            this.head = _head;
            this.torso = _torso;
            this.arms = _arms;
            this.legs = _legs;
        }

        draw(): void {
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

}
