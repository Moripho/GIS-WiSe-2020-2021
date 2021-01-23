import * as Http from "http";                                                                       // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird
import * as Url from "url";                                                                         // importieren des URL-Moduls, URL in einzelne, les- und verwendbare Teile aufzusplitten
import * as Mongo from "mongodb";

export namespace KapitelabgabeDreiServer {                                                          // Namespacing für den Server der Kapitelaufgabe 3.1
    console.log("Starting server");                                                                 // Konsolenausgabe "Starting Server" um Startpunk des Servers in der Konsolenausgabe nachvollziehen zu können
    let port: number = Number(process.env.PORT);                                                    // Erstellen der Port-Adresse
    if (!port)                                                                                      // falls port keinen Wert hat, wird der Port 8100 zugewiesen
        port = 8100;

    let server: Http.Server = Http.createServer();                                                  // createServer() erstellt einen Server und speichert dessen Wert in der Variablen server vom Typ HTML.server
    server.addListener("request", handleRequest);                                                   // Um Anfragen (requests) von Nutzern auf einem Server verarbeiten zu können, wird dieser Eventlistener verwendet. Der Listener ruft für jede eingehende Nutzeranfrage bzw. request die handleRequest-Funktion auf  
    server.addListener("listening", handleListen);                                                  // Eventlistener: Hört Server zu und befindet sich im status "listen" und es erfolgte noch keine Anfrage durch den Nutzer, so wird die Funktion handleListen() aufgerufen
    server.listen(port);                                                                           // listen-Funktion wird aufgerufen und triggert Zeil 11 bzw. Eventlistener

    console.log("Server starting on port: " + port);

    function handleListen(): void {                                                                 // Funktion die angibt, dass Server gerade zuhört
        console.log("Listening");                                                                   // Konsolenausgabe, die obiges wiederspiegeln soll
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {  // Funktion, die die Serveranfragen durch Nutzer verarbeitet
                                                                                                    // LAUT VORLESUNGSMATERIALIEN:
                                                                                                    // handleRequest erwartet normalerweise zwei Parameter, ersteres vom Typ IncomingMessage, letzteres vom Typ ServerResponse (beide aus http-Modul)
                                                                                                    // IncomingMessage liefert Infos zum eingegangenen Request-Objekt (z. B. URL als String)
                                                                                                    // ServerResponse ist ein Objekt, welches Infos für die Serverantowrt sammelt. Die Info wird unterteilt in Header (Infos zur eigentlichen Nachricht) und Body (die Nachricht selbst)                                                                                                  

        _response.setHeader("content-type", "text/html; charset=utf-8");                            // über setHeader-Funktion wird Header-Information integriert. Header gibt an, dass die Serverantwort ein mit utf-8 kodierter Text ist.
        _response.setHeader("Access-Control-Allow-Origin", "*");                                    // jeder darf Nachricht öffnen, Asterisk "*" = alles
        _response.write(_request.url);                                                              // Funktion, die dem Nachrichten-Body die URL der Serverrequest anfügt
        _response.end();                                                                            // markiert Ende der Serverantwort
    }
}
