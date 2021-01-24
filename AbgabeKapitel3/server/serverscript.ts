import * as Http from "http";                                                                       // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
import * as Url from "url";                                                                         // importieren des URL-Moduls, um URL in einzelne, les- und verwendbare Teile aufzusplitten
import * as Mongo from "mongodb";

export namespace KapitelabgabeDreiServer {                                                          // Namespacing für den Server der Kapitelabgabe 3
    interface User {
        fname: string;
        lname: string;
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

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {  // Funktion, die die Serveranfragen durch Nutzer verarbeitet
        // LAUT VORLESUNGSMATERIALIEN:
        // handleRequest erwartet normalerweise zwei Parameter, ersteres vom Typ IncomingMessage, letzteres vom Typ ServerResponse (beide aus http-Modul)
        // IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String)
        // ServerResponse ist ein Objekt, welches Infos für die Serverantowrt sammelt. Die Info wird unterteilt in Header (Infos zur eigentlichen Nachricht) und Body (die Nachricht selbst)                                                                                                  

        _response.setHeader("content-type", "text/html; charset=utf-8");                            // über setHeader-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist.
        _response.setHeader("Access-Control-Allow-Origin", "*");                                    // jeder darf Nachricht öffnen, Asterisk "*" = alles

        if (_request.url) {
            console.log("Received parameters");

            const url: URLSearchParams = new URLSearchParams(_request.url.replace("/?", ""));
            let response: string;

            switch (url.get("requestType")) {
                case "register":
                    response = await register(url);
                    break;
                case "login":
                    response = await login(url);
                    break;
                case "getUsers":
                    response = await getUsers();
                    break;
                default:
                    response = JSON.stringify({
                        error: true,
                        message: "Error: Unknown request type"
                    })
            }
            _response.write(response);
        }
        _response.end();                                                                            // markiert Ende der Serverantwort
    }

    async function register(url: URLSearchParams): Promise<string> {
        const emailExists: boolean = (await userData.findOne({ email: url.get("email") })) !== null;

        if (!emailExists) {

            userData.insertOne({
                fname: url.get("fname"),
                lname: url.get("lname"),
                postalCode: url.get("postalCode"),
                city: url.get("city"),
                email: url.get("email"),
                password: url.get("password")
            });
            console.log(`Saved user ${url.get("fname")} to database`);                              // Servernachricht, dass der Nutzer angelegt wurde.
        }

        return JSON.stringify({
            error: emailExists,
            message: emailExists ? "E-Mail existiert bereits!" : "Konto erstellt"
        });
    }

    async function login(url: URLSearchParams): Promise<string> {
        const email: string = url.get("email");
        const password: string = url.get("password");

        const loginSuccess: boolean = true;

        await userData.find({}, { projection: { _id: 0, email: 1, password: 1 } }))

        return JSON.stringify({
            error: loginSuccess,
            message: loginSuccess ? "Login successful" : "Login failed"

        });
    }

    async function getUsers(): Promise<string> {
        const users: User[] = await userData.find({}, { projection: { _id: 0, fname: 1, lname: 1, postalCode: 0, city: 0, email: 0, password: 0 } }).toArray();

        

        return JSON.stringify({
            error: false,
            message: JSON.stringify(users)
        });
    }


}
