"use strict";
var AufgabeZwei;
(function (AufgabeZwei) {
    function min(..._uebergabeParameter) {
        return Math.min(..._uebergabeParameter); // Das entstandene Number-Array wird für die Math-min-Funktion in seine einzelnen Werte aufgesplittet
    }
    function isEven(_randomZahl) {
        if (_randomZahl === 0) {
            return true;
        }
        else if (_randomZahl === 1) {
            return false;
        }
        else {
            return isEven(_randomZahl < 0 ? (_randomZahl + 2) : (_randomZahl - 2));
        }
    }
    let student1 = { vorname: "Hans", nachname: "Juergen", alter: 22, matrikelnummer: 12345 };
    let student2 = { vorname: "Nils", nachname: "Grunzer", alter: 23, matrikelnummer: 12346 };
    let student3 = { vorname: "Friedolin", nachname: "Ferdinand", alter: 30, matrikelnummer: 12347 };
    let studentenListe = [student1, student2, student3];
    studentenListe.push({ vorname: "Benji", nachname: "Benno", alter: 32, matrikelnummer: 12348 });
    function showInfo(_randomStudent) {
        console.log("Vorname: " + _randomStudent.vorname);
        console.log("Nachname: " + _randomStudent.nachname);
        console.log("Alter: " + _randomStudent.alter);
        console.log("Matrikelnummer: " + _randomStudent.matrikelnummer);
    }
    for (let currentStudent of studentenListe) {
        showInfo(currentStudent);
    }
    /* alternativ geht auch:
    studentenListe.forEach(currentStudent => showInfo(currentStudent));
    */
    function backwards(_numberArray) {
        let backwardsArray;
        for (let i = 0; i < _numberArray.length - 1; i++) {
            backwardsArray.push(_numberArray[_numberArray.length - i]);
        }
        return backwardsArray;
        /* alternativ geht auch:
        return _numberArray.reverse()*/
    }
    function join(..._uebergabeArrays) {
        let joinedArray;
        for (let numArray of _uebergabeArrays) {
            joinedArray.push(...numArray); // ACHTUNG: Hier müssen selbstverständlich die Werte der Number-Arrays aus dem zweidimensionalen Array übergeben werden
        }
        return joinedArray;
        /* alternativ geht auch:
        return _uebergabeArrays.flat()*/
    }
    function split(_randomArray, indexOne, indexTwo) {
        if (indexOne >= 0 && indexOne < indexTwo && indexTwo < _randomArray.length) {
            let splitArray;
            _randomArray.forEach((num, index) => {
                if (index >= indexOne && index <= indexTwo) {
                    splitArray.push(num);
                }
            });
            return splitArray;
            /* alternativ geht auch:
           return _randomArray.slice(indexOne, indexTwo)*/
        }
    }
})(AufgabeZwei || (AufgabeZwei = {}));
//# sourceMappingURL=uebung2.js.map