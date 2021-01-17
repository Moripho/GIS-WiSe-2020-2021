namespace AufgabeDrei {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
    let context: CanvasRenderingContext2D = canvas.getContext("2d");




    //Aufgabe 3 a)

    //Boden
    context.beginPath();
    context.rect(0, 800, 1000, 200);
    context.fillStyle = "#228B22";
    context.fill();

    //Himmel
    context.beginPath();
    context.rect(0, 0, 1000, 800);
    context.fillStyle = "#AEEEEE";
    context.fill();

    //Haus Körper
    context.beginPath();
    context.rect(700, 650, 150, 150);
    context.fillStyle = "#C0C0C0";
    context.fill();

    //Haus Dach
    context.beginPath();
    context.moveTo(775, 550);
    context.lineTo(675, 650);
    context.lineTo(875, 650);
    context.lineTo(775, 550);
    context.strokeStyle = "red";
    context.stroke();
    context.fillStyle = "red";
    context.fill();

    //Baumstamm
    context.beginPath();
    context.moveTo(300, 550);
    context.lineTo(300, 800);
    context.strokeStyle = "#371b07";
    context.lineWidth = 15;
    context.stroke();

    //Baumblätter
    context.beginPath();
    context.arc(300, 500, 70, 0, 2 * Math.PI, false);
    context.fillStyle = "green";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "#003300";
    context.stroke();

    //Sonne
    context.beginPath();
    context.arc(800, 300, 50, 0, 2 * Math.PI, false);
    context.fillStyle = "yellow";
    context.fill();




    //Aufgabe 3 b) + c)
    class Rect {
        width: number;
        height: number;
        x: number;
        y: number;
        color: string;
        constructor(_width?: number, _height?: number, _x?: number, _y?: number, _color?: string) { // Übergabeparameter sind optional
            this.width = _width || Math.random() * 100;
            this.height = _height || Math.random() * 100;
            this.x = _x || Math.random() * 100;
            this.y = _y || Math.random() * 100;
            this.color = _color || "#000";

        }

    }

    //Aufgabe 3 d)
    function drawRect(_rect: Rect): void {
        console.log(_rect);
        context.beginPath();
        context.rect(_rect.x, _rect.y, _rect.width, _rect.height);
        context.fillStyle = _rect.color;
        context.fill();

    }

    // drawRect(new Rect());

    //Aufgabe 3 e)
    let rectArray: Rect[] = [new Rect(), new Rect(undefined, undefined, undefined, undefined, "#00ff00"), new Rect(50, 50, 150, 140, "#ff0000")]; //Testwerte

    rectArray.forEach(rect => drawRect(rect));

}


