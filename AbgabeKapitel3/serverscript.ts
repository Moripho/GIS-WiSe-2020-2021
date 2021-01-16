import * as Http from "http"; // importieren des HTTP-Moduls, was für den Serverbau gebraucht wird

export namespace P_3_1Server {
    console.log("Starting server"); //Konsolenausgabe "Starting Server"
    let port: number = Number(process.env.PORT); // Erstellen der Port-Adresse
    if (!port) // falls kein Port existierd wird der Port 8100 (localhost) erstellt
        port = 8100;

    let server: Http.Server = Http.createServer(); 
    server.addListener("request", handleRequest); // Serverrequest
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
}
