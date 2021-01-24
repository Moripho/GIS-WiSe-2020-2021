"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KapitelabgabeDreiServer = void 0;
const Http = require("http"); // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
const Mongo = require("mongodb");
var KapitelabgabeDreiServer;
(function (KapitelabgabeDreiServer) {
    let userData;
    let port = Number(process.env.PORT); // Erstellen der Port-Adresse
    if (!port)
        port = 8100; // falls port keinen Wert hat, wird der Port 8100 zugewiesen
    const isLocal = false; // Bei Upload in Cloud Wert als false setzen!
    const databaseURL = isLocal ? "mongodb://localhost:27017" : "mongodb+srv://moripho-admin:megapasswort@gis-wintersemester-20-2.ltfjc.mongodb.net/UserData?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer(); // createServer() erstellt einen Server und speichert dessen Wert in der Variablen server vom Typ HTML.server
        console.log("Server starting on port " + _port);
        server.listen(_port); // listen-Funktion wird aufgerufen und triggert Eventlistener
        server.addListener("request", handleRequest); // Um Anfragen (requests) von Nutzern auf einem Server verarbeiten zu können, wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage bzw. request die handleRequest-Funktion auf  
        server.addListener("listening", () => console.log("Listening")); // Eventlistener: Hört Server zu und befindet sich im status "listen" und es erfolgte noch keine Anfrage durch den Nutzer, so wird die Funktion handleListen() aufgerufen
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect(); // await da auf Promise gewartete wird
        userData = mongoClient.db("UserData").collection("Users");
        console.log("Database connection:", userData != undefined); // Hat userData Definition -> true, sonst false als Indikator
    }
    function handleRequest(_request, _response) {
        // LAUT VORLESUNGSMATERIALIEN:
        // handleRequest erwartet normalerweise zwei Parameter, ersteres vom Typ IncomingMessage, letzteres vom Typ ServerResponse (beide aus http-Modul)
        // IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String)
        // ServerResponse ist ein Objekt, welches Infos für die Serverantowrt sammelt. Die Info wird unterteilt in Header (Infos zur eigentlichen Nachricht) und Body (die Nachricht selbst)                                                                                                  
        _response.setHeader("content-type", "text/html; charset=utf-8"); // über setHeader-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist.
        _response.setHeader("Access-Control-Allow-Origin", "*"); // jeder darf Nachricht öffnen, Asterisk "*" = alles
        if (_request.url) {
            console.log("Received parameters");
            const url = new URLSearchParams(_request.url.replace("/?", ""));
            // url.forEach((value, key) => _response.write(key + ":" + value)) 
            // _response.write(url.toString()); 
            // '/?fname=korpus&lname=kopp&'  
            storeOrder({
                fname: url.get("fname"),
                lname: url.get("lname"),
                postalCode: url.get("postalCode"),
                city: url.get("city"),
                email: url.get("email"),
                password: url.get("password")
            });
            console.log(`Saved user ${url.get("fname")} to database`);
        }
        _response.end(); // markiert Ende der Serverantwort
    }
    function storeOrder(_user) {
        userData.insertOne(_user);
    }
})(KapitelabgabeDreiServer = exports.KapitelabgabeDreiServer || (exports.KapitelabgabeDreiServer = {}));
//# sourceMappingURL=serverscript.js.map