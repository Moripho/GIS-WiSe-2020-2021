"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http"); // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); //Konsolenausgabe "Starting Server" um Startpunk des Servers in der Konsolenausgabe nachvollziehen zu können
    let port = Number(process.env.PORT); // Erstellen der Port-Adresse
    if (!port) // falls kein Port existiert, wird dem Port der Wert 8100 (localhost) zugewiesen
        port = 8100;
    let server = Http.createServer(); // createServer() erstellt einen Server und speicher Ergebnis in der Variablen "server"
    server.addListener("request", handleRequest); // Um Anfragen von Nutzern auf einem Server verarbeiten zu können wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage die handleRequest-Funktion auf.
    server.addListener("listening", handleListen); // Eventhandler für das "Zuhören" des Servers. Hört der Server zu und es erfolgt in dem Momement keine Anfrage durch den Nutzer, so wird die Funktion handleListen ausgeführt 
    server.listen(port); // Server soll auf Portnummer hören
    function handleListen() { // Funktion handleListen
        console.log("Listening");   // Konsolenausgabe "Listening", die dem Nutzer veranschaulicht, dass der Server gerade "zuhört"
    }
    function handleRequest(_request, _response) { // Funktion, die die Serveranfragen durch Nutzer verarbeitet.
                                                // LAUT VORLESUNGSMATERIALIEN:
                                                // Die Funktion erwartet normalerweise zwei Parameter: den ersten vom Typ IncomingMessage, den zweiten vom Typ ServerResponse (beide aus dem http-Modul).
                                                //IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String).
                                                //ServerResponse ist ein Objekt, welches Infos für die Antwort sammelt. Die Info wird in zwei Kategorien aufgeteilt: Header (Infos zur eigentlichen Nachricht) + Body (die Nachricht selbst)
        console.log("I hear voices!");              // Konsolenausgabe "I hear voices"
        _response.setHeader("content-type", "text/html; charset=utf-8"); // über setHeader()-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist       
        _response.setHeader("Access-Control-Allow-Origin", "*"); // jeder darf Nachricht öffnen, Asterisk "*" = alles
        _response.write(_request.url); // Funktion, die dem Nachrichten-Body die URL der Serverrequest anfügt
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=serverscript.js.map