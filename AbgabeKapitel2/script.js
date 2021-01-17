"use strict";
var characterCreation;
(function (characterCreation) {
    let mainCanvas = document.getElementById("characterGenerator"); // Main Canvas "characterGenerator" erstellen
    let mainContext = mainCanvas.getContext("2d"); // 2D Kontext definieren, Drawing object erstellen
    let optionCanvasArray = [...document.querySelectorAll(".optionCanvas")]; // Array für die versch. Optionen erstellen
    let optionContextArray = optionCanvasArray.map(canvas => canvas.getContext("2d")); // 2D-Kontext-Array erstellen für alle Elemente des optionCanvasArray(s), drawing objects erstellen
    let resultButton = document.getElementById("resultButton"); // resultButton-Variable definieren. Es wird über die im HTML-Dokument definierte ID "resultButton" zurückgegriffen
    let character; // Character definieren
    let headsArray; // Array für die versch. Köpfe
    let torsosArray; // Array für die versch. Torsi
    let armsArray; // Array für die versch. Arme
    let legsArray; // Array für die versch. Beine
    class Rect {
        constructor(_posX, _posY, _width, _height, _fillStyle) {
            this.posX = _posX; // this-Verweis, um jeweils per Punktnotation jeweils auf einzelne Attribute der versch. Objekte zugreifen zu können
            this.posY = _posY;
            this.width = _width;
            this.height = _height;
            this.fillStyle = _fillStyle;
        }
    }
    function drawRect(context, x, y, width, height, fillStyle) {
        // Funktion, um Rechtecke zu zeichnen. Ihr werden sowohl der Canvas Rendering Kontext, als auch x- und y-Koordinate, sowie Breite und Höhe und Farbe übergeben
        context.beginPath(); // Pfadanfang definieren (immer als erstes bei Zeichnungen)
        context.rect(x, y, width, height); // Rechteck Kontext definieren
        context.fillStyle = fillStyle; // Füllfarbe des zu zeichnenden Rechtecks
        context.fill(); // füllen des Rechtecks
    }
    class Head {
        constructor(_fillStyle) {
            this.fillStyle = _fillStyle; // Farbe des Kopfes
        }
        drawMain() {
            mainContext.beginPath(); // Pfadanfang definieren (immer als erstes bei Zeichnungen)
            mainContext.arc(350, 100, 100, 0, 2 * Math.PI, false); // Basic-Funktionen um einen runden Kreis zu zeichnen
            mainContext.fillStyle = this.fillStyle; // Füllfarbe des zu zeichnenden Kreises
            mainContext.fill(); // befüllen des Kreises
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
            super(260, 200, 180, 260, _fillStyle); // da die versch. Optionen alle gleich groß sind, wurden hier Standardwerte definiert, nur der FillStyle ist bei allen Torsi unterschedlich
        }
        drawMain() {
            drawRect(mainContext, this.posX, this.posY, this.width, this.height, this.fillStyle); // Aufruf der allgemeinen Draw-Funktion für Rechtecke
        }
        drawOption(context) {
            drawRect(context, this.posX - 200, this.posY - 157, this.width / 2, this.height / 2, this.fillStyle); // Aufruf der allgemeinen Draw-Funktion für Rechtecke, allerdings mit Anpassung der X- und Y-Koordinaten, sowei der Höhe und Breite
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
            if (resultButton && this.isFullyAssembled()) { // Wenn der resultButton vorhanden ist und die Bedingung isFullyAssembled erfüllt ist, dann...
                resultButton.classList.remove("disabled"); // Ergebnis Button ist nicht mehr grau hinterlegt
                resultButton.addEventListener("click", () => location.href = "index.html"); // EventListener, der schaut, ob auf den Resultbutton geklickt wurde und dann auf Ergebnisseite (index.html) weiterleitet
            }
        }
        isFullyAssembled() {
            //Es wird geprüft, ob alle Körperteile farbig und nicht weiß sind, da keine der Optionen ein weißes Körperteil zu Verfügung stellt und der Canvas an sich als Default die Farbe Weiß hat
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
        let currentSite = location.pathname.split("/").pop().replaceAll(".html", ""); // hier wird die aktuelle Location-Adresse aufgesplittet, um festzustellen, welcher der folgenden Cases eintritt
        switch (currentSite) {
            case "head": // befindet man sich auf der head(.html)-Seite, so wird die Funktion registerHeads() ausgeführt
                registerHeads();
                break;
            case "torso": // befindet man sich auf der torso(.html)-Seite, so wird die Funktion registerTorsos() ausgeführt
                registerTorsos();
                break;
            case "arms": // befindet man sich auf der arms(.html)-Seite, so wird die Funktion registerArms() ausgeführt
                registerArms();
                break;
            case "legs": // befindet man sich auf der legs(.html)-Seite, so wird die Funktion registerLegs() ausgeführt
                registerLegs();
                break;
            case "index": // befindet man sich auf der index(.html)-Seite, so wird geprüft, ob...
                if (character.isFullyAssembled())
                    sendCharacterToServer(); // der Character vollständig ist, und falls ja werden seine Daten an den Server geschickt
        }
    });
    async function loadCharacterData() {
        const response = await fetch("https://raw.githubusercontent.com/Moripho/GIS-WiSe-2020-2021/main/AbgabeKapitel2/data.json"); // Starten einer Serveranfrage um Charakterdaten aus json-Datei zu laden, Serveranfrage liefert aufgrund Asynchronität ein Objekt vom Typ Promise
        const data = await response.json(); // Warten auf die zu beziehende json-Datei
        const storageItem = sessionStorage.getItem("character"); // Konstante definieren, um sessionStorage abspeichern zu können, session Storage bekommt die Werte von "character"
        headsArray = data.headsArray.map(head => new Head(head.fillStyle));
        torsosArray = data.torsosArray.map(torso => new Torso(torso.fillStyle));
        armsArray = data.armsArray.map(arms => new Arms(arms.fillStyle));
        legsArray = data.legsArray.map(legs => new Legs(legs.fillStyle));
        const charInfo = storageItem ? JSON.parse(storageItem) : data.character; // Existiert bereits ein Character? 
        character = new Character(new Head(charInfo.head.fillStyle), new Torso(charInfo.torso.fillStyle), new Arms(charInfo.arms.fillStyle), new Legs(charInfo.legs.fillStyle));
    }
    async function sendCharacterToServer() {
        const displayStatus = document.getElementById("serverMessage"); // Bezugnahme auf das HTML-Element (ID) serverMessage, welches die Servermessage darstellen soll
        const url = "https://gis-communication.herokuapp.com"; // URL des Servers, mit welchem kommuniziert wird
        const query = new URLSearchParams({
            head: JSON.stringify(character.head),
            torso: JSON.stringify(character.torso),
            arms: JSON.stringify(character.arms),
            legs: JSON.stringify(character.legs)
        });
        const res = await fetch(url + "?" + query.toString()); // Konstante "Server Response", bestehend aus der Server-URL und, mit Fragezeichen getrennt, dem Query, der die eigentlichen Nutzdaten dar, die bei der synchronen Übertragung mit der Get-Methode des Formulars bereits automatisch aufbereitet und mitgeschickt wurden
        const answer = await res.json(); // Deklaration der Kontanten "answer" vom Typ ServerMledung
        displayStatus.innerText = "Server: " + (await answer.message || await answer.error); // Text des displayStatus wird abhängig davon befüllt, ob ein error oder eine erfolgreiche Kommunikation stattgefunden hat. Hierzu wird
        displayStatus.style.color = await answer.message ? "#19e619" : "#a02128"; // war die Kommunikation erfolgreich, wird die Serverantwort in grün und sonst in rot dargestellt
    }
    function registerHeads() {
        optionCanvasArray.forEach((canvas, index) => {
            canvas.addEventListener("click", () => {
                character.head = headsArray[index]; // den Wert des Kopfes des Characters gleich dem Kopf im headsArray am momentanen Index setzt
                character.draw(); // Der character wird anschließend gezeichnet
            });
        });
        headsArray.forEach((head, index) => head.drawOption(optionContextArray[index])); // für jeden head an einem Index des headsarray wird die drawOption-Funktion aufgerufen, der dann jeweilige Kopf aus dem optionContextArray übergeben wird
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