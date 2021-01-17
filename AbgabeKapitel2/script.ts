namespace characterCreation { // Namespace für alle relevanten Funktionen, um diese auch exportieren zu können

    let mainCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("characterGenerator"); // Main Canvas "characterGenerator" erstellen
    let mainContext: CanvasRenderingContext2D = mainCanvas.getContext("2d"); // 2D Kontext definieren, Drawing object erstellen

    let optionCanvasArray: HTMLCanvasElement[] = <HTMLCanvasElement[]>[...document.querySelectorAll(".optionCanvas")]; // Array für die versch. Optionen erstellen
    let optionContextArray: CanvasRenderingContext2D[] = optionCanvasArray.map(canvas => canvas.getContext("2d")); // 2D-Kontext-Array erstellen für alle Elemente des optionCanvasArray(s), drawing objects erstellen

    let resultButton: HTMLElement = document.getElementById("resultButton"); // resultButton-Variable definieren. Es wird über die im HTML-Dokument definierte ID "resultButton" zurückgegriffen

    let character: Character;                           // Character definieren
    let headsArray: Head[];                             // Array für die versch. Köpfe
    let torsosArray: Torso[];                           // Array für die versch. Torsi
    let armsArray: Arms[];                              // Array für die versch. Arme
    let legsArray: Legs[];                              // Array für die versch. Beine

    class Rect {                                        // Klasse Rect(angle), für rechteckige Tori, Arme und Beine
        posX: number;                                   // Variable für X-Koordinate
        posY: number;                                   // Variable für Y-Koordinate
        width: number;                                  // Variable für Breite
        height: number;                                 // Variable für Höhe
        fillStyle: string;                              // Variable für fillstyle, also Farbe, des jeweiligen Körperteils

        constructor(_posX: number, _posY: number, _width: number, _height: number, _fillStyle: string) {            // Konstruktor der Klasse
            this.posX = _posX;                          // this-Verweis, um jeweils per Punktnotation jeweils auf einzelne Attribute der versch. Objekte zugreifen zu können
            this.posY = _posY; 
            this.width = _width;
            this.height = _height;
            this.fillStyle = _fillStyle;
        }
    }

    function drawRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillStyle: string): void {
        // Funktion, um Rechtecke zu zeichnen. Ihr werden sowohl der Canvas Rendering Kontext, als auch x- und y-Koordinate, sowie Breite und Höhe und Farbe übergeben
        context.beginPath();                            // Pfadanfang definieren (immer als erstes bei Zeichnungen)
        context.rect(x, y, width, height);              // Rechteck Kontext definieren
        context.fillStyle = fillStyle;                  // Füllfarbe des zu zeichnenden Rechtecks
        context.fill();                                 // füllen des Rechtecks
    }

    export class Head {                                 // Kopf-Klasse
        fillStyle: string;                              // um einen Kreis bzw. Kopf zu zeichnen bedarf es lediglich einer Farbe

        constructor(_fillStyle: string) {               // Konstruktor, um einen Kopf anzulegen
            this.fillStyle = _fillStyle;                // Farbe des Kopfes
        }
        drawMain(): void {                                              // Funktion um Kreis bzw. Kopf auf dem großen Canvas zu zeichnen
            mainContext.beginPath();                                    // Pfadanfang definieren (immer als erstes bei Zeichnungen)
            mainContext.arc(350, 100, 100, 0, 2 * Math.PI, false);      // Basic-Funktionen um einen runden Kreis zu zeichnen
            mainContext.fillStyle = this.fillStyle;                     // Füllfarbe des zu zeichnenden Kreises
            mainContext.fill();                                         // befüllen des Kreises
        }
        drawOption(context: CanvasRenderingContext2D): void {           // Funktion um Kreis bzw. Kopf auf dem kleinen Option-Canvas zu zeichnen
            context.beginPath();
            context.arc(110, 110, 50, 0, 2 * Math.PI, false);
            context.fillStyle = this.fillStyle;
            context.fill();
        }
    }

    export class Torso extends Rect {                   // Die Torso-Klasse erbt von der Basic-Klasse Rect(angle)
        constructor(_fillStyle: string) {               // Im Kontruktor wird daher lediglich der fillStyle angegeben
            super(260, 200, 180, 260, _fillStyle);      // da die versch. Optionen alle gleich groß sind, wurden hier Standardwerte definiert, nur der FillStyle ist bei allen Torsi unterschedlich
        }
        drawMain(): void {                                 // Funktion, um Torso auf dem großen Canvas zu zeichnen
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle); // Aufruf der allgemeinen Draw-Funktion für Rechtecke
        }
        drawOption(context: CanvasRenderingContext2D): void {   // Funktion, um Torso auf dem kleinen Option-Canvas zu zeichnen
            drawRect(context, this.posX - 200, this.posY - 157, this.width / 2, this.height / 2, this.fillStyle); // Aufruf der allgemeinen Draw-Funktion für Rechtecke, allerdings mit Anpassung der X- und Y-Koordinaten, sowei der Höhe und Breite
        }
    }

    export class Arms extends Rect { // s. o.
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

    export class Legs extends Rect { // s. o.
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

    export class Character { // Character Klasse
        // Attribute des Characters
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

        draw(): void {                                                          // Funktion zum Zeichnen des gesamten Characters auf dem großen Canvas
            sessionStorage.setItem("character", JSON.stringify(character));
            this.head.drawMain();
            this.torso.drawMain();
            this.arms.drawMain();
            this.legs.drawMain();
            if (resultButton && this.isFullyAssembled()) { // Wenn der resultButton vorhanden ist und die Bedingung isFullyAssembled erfüllt ist, dann...
                resultButton.classList.remove("disabled"); // Ergebnis Button ist nicht mehr grau hinterlegt
                resultButton.addEventListener("click", () => location.href = "index.html"); // EventListener, der schaut, ob auf den Resultbutton geklickt wurde und dann auf Ergebnisseite (index.html) weiterleitet
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

        const res: Response = await fetch(url + "?" + query.toString());
        const answer: ServerMeldung = await res.json();

        displayStatus.innerText = "Server: " + (await answer.message || await answer.error);
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
