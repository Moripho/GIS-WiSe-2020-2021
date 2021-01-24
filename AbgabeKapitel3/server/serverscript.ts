import * as Http from "http";                                                                       // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
import * as Url from "url";                                                                         // importieren des URL-Moduls, um URL in einzelne, les- und verwendbare Teile aufzusplitten
import * as Mongo from "mongodb";

export namespace KapitelabgabeDreiServer {                                                          // Namespacing für den Server der Kapitelabgabe 3
    interface User {
        fname: string;
        lname: string;
        postalCode: string;
        city: string;
        email: string;
        password: string;
    }

    interface ServerMeldung {   // Interface für Server Meldung
        error: string;          // Error Message, wenn E-Mail vorhanden
        message: string;        // Bestätigung, wenn User angelegt wurde
    }

    let userData: Mongo.Collection;

    let port: number = Number(process.env.PORT);                                                    // Erstellen der Port-Adresse, Process-Objekt liefert einen Port. Da dieses aber auch string oder undefined sein kann, auf number casten
    if (!port) port = 8100;                                                                         // falls port keinen Wert hat, wird der Port 8100 zugewiesen

    const isLocal: boolean = false;                                                                    // Bei Upload in Cloud Wert als false setzen!
    const databaseURL: string = isLocal ? "mongodb://localhost:27017" : "mongodb+srv://moripho-admin:megapasswort@gis-wintersemester-20-2.ltfjc.mongodb.net/UserData?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseURL);

    function startServer(_port: number): void {
        let server: Http.Server = Http.createServer();                                                  // Dunktion, um Server zu starten

        console.log("Server starting on port " + _port);

        server.listen(_port);                                                                           // listen-Funktion wird aufgerufen und triggert Eventlistener

        server.addListener("request", handleRequest);                                                   // Um Anfragen (requests) von Nutzern auf einem Server verarbeiten zu können, wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage bzw. request die handleRequest-Funktion auf  
        server.addListener("listening", () => console.log("Listening"));                                // Eventlistener: Hört Server zu und befindet sich im status "listening", so wird dies auf der Konsole ausgegeben
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();                                                // await da auf Promise gewartete wird
        userData = mongoClient.db("UserData").collection("Users");
        console.log("Database connection:", userData != undefined);                 // Hat userData Definition -> true, sonst false als Indikator
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {  // Funktion, die die Serveranfragen durch Nutzer verarbeitet
        // LAUT VORLESUNGSMATERIALIEN:
        // handleRequest erwartet normalerweise zwei Parameter, ersteres vom Typ IncomingMessage, letzteres vom Typ ServerResponse (beide aus http-Modul)
        // IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String)
        // ServerResponse ist ein Objekt, welches Infos für die Serverantowrt sammelt. Die Info wird unterteilt in Header (Infos zur eigentlichen Nachricht) und Body (die Nachricht selbst)                                                                                                  

        _response.setHeader("content-type", "text/html; charset=utf-8");                            // über setHeader-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist.
        _response.setHeader("Access-Control-Allow-Origin", "*");                                    // jeder darf Nachricht öffnen, Asterisk "*" = alles

        if (_request.url) {
            console.log("Received parameters");

            const url: URLSearchParams = new URLSearchParams(_request.url.replace("/?", ""));
            const emailExists: boolean = userData.findOne({ email: url.get("email") }) !== null;                             // verhindert, dass der Server den ersten Query als null ausliest. Server kann Search Parameter sonst nicht vom ersten Query trennen.
            
            if (!emailExists) {
                storeOrder({
                    fname: url.get("fname"),
                    lname: url.get("lname"),
                    postalCode: url.get("postalCode"),
                    city: url.get("city"),
                    email: url.get("email"),
                    password: url.get("password")
                });

                console.log(`Saved user ${url.get("fname")} to database`);                              // Servernachricht, dass der Nutzer angelegt wurde.
            }

            _response.write({
                error: emailExists,
                message: emailExists ? "E-Mail existiert bereits!" : "Konto erstellt"
            });
        }
        _response.end();                                                                            // markiert Ende der Serverantwort
    }

    function storeOrder(_user: User): void {                                                        // Funktion, die dafür sorgt, dass unser User an die User-Database weitergegeben und dort gespeichert wird
        userData.insertOne(_user);
    }
}
