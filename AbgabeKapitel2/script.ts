namespace characterCreation {

    let mainCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("characterGenerator");
    let mainContext: CanvasRenderingContext2D = mainCanvas.getContext("2d");

    let optionCanvasArray: HTMLCanvasElement[] = <HTMLCanvasElement[]>[...document.querySelectorAll(".optionCanvas")];
    let optionContextArray: CanvasRenderingContext2D[] = optionCanvasArray.map(canvas => canvas.getContext("2d"));

    let resultButton: HTMLElement = document.getElementById("resultButton");

    let character: Character;
    let headsArray: Head[];
    let torsosArray: Torso[];
    let armsArray: Arms[];
    let legsArray: Legs[];

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

    function drawRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillStyle: string): void {
        context.beginPath();
        context.rect(x, y, width, height);
        context.fillStyle = fillStyle;
        context.fill();
    }

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
            if (resultButton && this.isFullyAssembled()) {
                resultButton.classList.remove("disabled");
                resultButton.addEventListener("click", () => location.href = "index.html");
            }
        }

        isFullyAssembled(): boolean {
            return this.head.fillStyle !== "white" && 
                    this.torso.fillStyle !== "white" && 
                    this.arms.fillStyle !== "white" && 
                    this.legs.fillStyle !== "white";
        }
    }

    window.addEventListener("load", async () => {
        await loadCharacterData();
        character.draw();

        let currentSite: string = location.pathname.split("/").pop().replaceAll(".html", "");
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
                if (character.isFullyAssembled()) sendCharacterToServer();
        }
    });

    interface ServerResponse {
        headsArray: Head[];
        torsosArray: Torso[];
        armsArray: Arms[];
        legsArray: Legs[];
        character: Character;
    }

    async function loadCharacterData(): Promise<void> {
        const response: Response = await fetch("https://raw.githubusercontent.com/Moripho/GIS-WiSe-2020-2021/main/AbgabeKapitel2/data.json");
        const data: ServerResponse = await response.json();
        const storageItem: string = sessionStorage.getItem("character");

        headsArray = data.headsArray.map(head => new Head(head.fillStyle));
        torsosArray = data.torsosArray.map(torso => new Torso(torso.fillStyle));
        armsArray = data.armsArray.map(arms => new Arms(arms.fillStyle));
        legsArray = data.legsArray.map(legs => new Legs(legs.fillStyle));

        const charInfo: Character = storageItem ? (JSON.parse(storageItem) as Character) : data.character;

        character = new Character(
            new Head(charInfo.head.fillStyle), 
            new Torso(charInfo.torso.fillStyle),
            new Arms(charInfo.arms.fillStyle),
            new Legs(charInfo.legs.fillStyle)
        );
    }

    interface ServerMeldung {
        error: string;
        message: string;
    }

    async function sendCharacterToServer(): Promise<void> {
        const displayStatus: HTMLElement = document.getElementById("serverMessage");
        
        const url: string = "https://gis-communication.herokuapp.com";
        const query: URLSearchParams = new URLSearchParams(<any>{
            head: JSON.stringify(character.head),
            torso: JSON.stringify(character.torso),
            arms: JSON.stringify(character.arms),
            legs: JSON.stringify(character.legs)
        });

        const res: Response = await fetch(url + "?" + query.toString())
        const answer: ServerMeldung = await res.json();

        displayStatus.innerText = "Server: " + await answer.message || await answer.error;
        displayStatus.style.color = await answer.message ? "#19e619" : "#a02128";
    }

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
}
