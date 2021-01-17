"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http"); // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); //Konsolenausgabe "Starting Server" um Startpunk des Servers in der Konsolenausgabe nachvollziehen zu können
    let port = Number(process.env.PORT); // Erstellen der Port-Adresse
    if (!port) // falls kein Port existiert, wird der Port 8100 (localhost) erstellt
        port = 8100;
    let server = Http.createServer(); // erstellt einen Server
    server.addListener("request", handleRequest); // Um Anfragen von Nutzern auf einem Server verarbeiten zu können wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage die handleRequest-Funktion auf.
    server.addListener("listening", handleListen); // Eventhandler für das "Zuhören" des Servers, bei einer Serverrequest wird die Funktion handleRequest ausgeführt 
    server.listen(port); // Server 
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) { // Funktion, die die Serveranfragen durch Nutzer verarbeitet
        console.log("I hear voices!");              // Konsolenausgabe "I hear voices"
        _response.setHeader("content-type", "text/html; charset=utf-8");        
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=serverscript.js.map