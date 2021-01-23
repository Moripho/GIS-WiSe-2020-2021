"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KapitelabgabeDreiServer = void 0;
const Http = require("http"); // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
var KapitelabgabeDreiServer;
(function (KapitelabgabeDreiServer) {
    console.log("Starting server"); // Konsolenausgabe "Starting Server" um Startpunk des Servers in der Konsolenausgabe nachvollziehen zu können
    let port = Number(process.env.PORT); // Erstellen der Port-Adresse
    if (!port) // falls port keinen Wert hat, wird der Port 8100 zugewiesen
        port = 8100;
    let server = Http.createServer(); // createServer() erstellt einen Server und speichert dessen Wert in der Variablen server vom Typ HTML.server
    server.addListener("request", handleRequest); // Um Anfragen (requests) von Nutzern auf einem Server verarbeiten zu können, wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage bzw. request die handleRequest-Funktion auf  
    server.addListener("listening", handleListen); // Eventlistener: Hört Server zu und befindet sich im status "listen" und es erfolgte noch keine Anfrage durch den Nutzer, so wird die Funktion handleListen() aufgerufen
    server.listen(port); // listen-Funktion wird aufgerufen und triggert Zeil 11 bzw. Eventlistener
    function handleListen() {
        console.log("Listening"); // Konsolenausgabe, die obiges wiederspiegeln soll
    }
    function handleRequest(_request, _response) {
        // LAUT VORLESUNGSMATERIALIEN:
        // handleRequest erwartet normalerweise zwei Parameter, ersteres vom Typ IncomingMessage, letzteres vom Typ ServerResponse (beide aus http-Modul)
        // IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String)
        // ServerResponse ist ein Objekt, welches Infos für die Serverantowrt sammelt. Die Info wird unterteilt in Header (Infos zur eigentlichen Nachricht) und Body (die Nachricht selbst)                                                                                                  
        console.log("I hear voices!"); // Konsolenausgabe "I hear voices", wenn Server eine Nutzeranfrage verarbeitet
        _response.setHeader("content-type", "text/html; charset=utf-8"); // über setHeader-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist.
        _response.setHeader("Access-Control-Allow-Origin", "*"); // jeder darf Nachricht öffnen, Asterisk "*" = alles
        _response.write(_request.url); // Funktion, die dem Nachrichten-Body die URL der Serverrequest anfügt
        _response.end(); // markiert Ende der Serverantwort
    }
})(KapitelabgabeDreiServer = exports.KapitelabgabeDreiServer || (exports.KapitelabgabeDreiServer = {}));
//# sourceMappingURL=serverscript.js.map