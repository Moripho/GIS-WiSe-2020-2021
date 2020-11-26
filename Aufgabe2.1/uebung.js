"use strict";
/*
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
*/
let a = 2;
let b = 6;
function multiply(a, b) {
    // let ergebnis: number = a * b;
    return a * b;
}
function max(a, b) {
    if (a < b) {
        return b;
    }
    else {
        return a;
    }
}
function sumhundred() {
    let x = 0;
    let sum = 0;
    while (x <= 100) {
        x++;
        sum += x;
    }
    console.log(sum);
}
function random() {
    for (let i = 0; i < 10; i++) {
        console.log(Math.floor(Math.random() * 101));
    }
}
function factorial(n) {
    let sum = 1;
    for (let i = 2; i <= n; i++) {
        sum = sum * i;
    }
    return n < 1 ? 1 : sum;
}
function leapyears() {
    for (let i = 1900; i <= 2020; i++) {
        if (i % 4 === 0 && i % 100 !== 0 && i % 400 === 0) {
            console.log(i);
        }
    }
}
function rauteshit() {
    for (let i = 1; i <= 7; i++) {
        console.log("#".repeat(i));
    }
}
function fizzbuzz() {
    for (let i = 1; i <= 100; i++) {
        let temp = "";
        if (i % 3 === 0) {
            temp += "Fizz";
        }
        if (i % 5 === 0) {
            temp += "Buzz";
        }
        console.log(temp || i);
    }
}
function chessboard(width, height) {
    let x = "";
    for (let i = 0; i < height; i++) {
        x += i % 2 ? " " : "#";
        for (let j = 1; j < width; j++) {
            x += x[x.length - 1] === "#" ? " " : "#";
        }
        x += "\n";
    }
    console.log(x);
}
//# sourceMappingURL=uebung.js.map