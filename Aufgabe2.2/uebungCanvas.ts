let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d");

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

function drawRect(rect: Rect) {
    console.log(rect);
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = rect.color;
    context.fill();
    
}

// drawRect(new Rect());

let rectArray: Rect[] = [new Rect(), new Rect( undefined, undefined, undefined, undefined, "#00ff00"), new Rect(50, 50, 150, 140, "#ff0000")];

rectArray.forEach(rect => drawRect(rect));




