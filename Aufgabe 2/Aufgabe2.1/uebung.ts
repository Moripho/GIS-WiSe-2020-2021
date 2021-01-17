let x: string = "Hallo";
let func: () => void = () => console.log();

console.log(x); // Hallo
func1(x); // Bla
console.log(x); // Hallo
func2(); // Blubb
func3(); 
console.log(x); // Test

function func1(y: string): void{
    y = "Bla";
    console.log(y);
}

function func2(): void{
    let x: string = "Blubb";
    console.log(x);
}

function func3(): void{
    x = "Test";
}

let a: number = 2;
let b: number = 6;

function multiply(a: number, b: number): number {
    // let ergebnis: number = a * b;
    return a * b;
}

function max(a: number, b: number): number {
    if (a < b) {
        return b;
    }
    else {
        return a;
    }
}

function sumhundred(): void {
    let x: number = 0;
    let sum: number = 0;

    while (x <= 100) {
        x++;
        sum += x;
    }

    console.log(sum);

}

function random(): void {
    for (let i: number = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 101));
    }
}

function factorial(n: number): number {
    let sum: number = 1;
    for (let i: number = 2; i <= n; i++) {
        sum = sum * i;
    }
    return n < 1 ? 1 : sum;
}

function leapyears(): void {
    for (let i: number = 1900; i <= 2020; i++) {
        if (i % 4 === 0 && i % 100 !== 0 && i % 400 === 0) {
            console.log(i);
        }
    }
}

function rauteshit(): void {
    for (let i: number = 1; i <= 7; i++) {
        console.log("#".repeat(i));
    }
}

function fizzbuzz(): void {
    for (let i: number = 1; i <= 100; i++) {
        let temp: string = "";
        if (i % 3 === 0) {
            temp += "Fizz";
        }
        if (i % 5 === 0) {
            temp += "Buzz";
        }
        console.log(temp || i);
    }
}

function chessboard(width: number, height: number): void {
    let x: string = "";
    for (let i: number = 0; i < height; i++) {
        x += i % 2 ? " " : "#";

        for (let j: number = 1; j < width; j++) {
            x += x[x.length - 1] === "#" ? " " : "#";
        }
        x += "\n";
    }
    console.log(x);
}









