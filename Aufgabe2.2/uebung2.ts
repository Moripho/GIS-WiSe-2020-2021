namespace AufgabeZwei {
    function min(..._uebergabeParameter: number[]): number { // Übergabeparameter werden in einem Number-Array abgelegt
        return Math.min(..._uebergabeParameter);               // Das entstandene Number-Array wird für die Math-min-Funktion in seine einzelnen Werte aufgesplittet
    }

    function isEven(_randomZahl: number): boolean {
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

    interface Student {
        vorname: string;
        nachname: string;
        alter: number;
        matrikelnummer: number;

    }
    let student1: Student = { vorname: "Hans", nachname: "Juergen", alter: 22, matrikelnummer: 12345 };
    let student2: Student = { vorname: "Nils", nachname: "Grunzer", alter: 23, matrikelnummer: 12346 };
    let student3: Student = { vorname: "Friedolin", nachname: "Ferdinand", alter: 30, matrikelnummer: 12347 };

    let studentenListe: Student[] = [student1, student2, student3];

    studentenListe.push({ vorname: "Benji", nachname: "Benno", alter: 32, matrikelnummer: 12348 });

    function showInfo(_randomStudent: Student): void {
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

    function backwards(_numberArray: number[]): number[] {
        let backwardsArray: number[];
        for (let i: number = 0; i < _numberArray.length - 1; i++) {
            backwardsArray.push(_numberArray[_numberArray.length - i]);

        }
        return backwardsArray;
        /* alternativ geht auch:
        return _numberArray.reverse()*/
    }

    function join(..._uebergabeArrays: number[][]): number[] {  // Übergabeparameter Array von Number-Arrays wird erstellt
        let joinedArray: number[];
        for (let numArray of _uebergabeArrays) {
            joinedArray.push(...numArray);                      // ACHTUNG: Hier müssen selbstverständlich die Werte der Number-Arrays aus dem zweidimensionalen Array übergeben werden
        }
        return joinedArray;
        /* alternativ geht auch:
        return _uebergabeArrays.flat()*/
    }

    function split(_randomArray: number[], indexOne: number, indexTwo: number): number[] {
        if (indexOne >= 0 && indexOne < indexTwo && indexTwo < _randomArray.length) {
            let splitArray: number[];
            _randomArray.forEach((num, index) => { // num = Numberwert index = Index von Numberwert
                if (index >= indexOne && index <= indexTwo){
                    splitArray.push(num);
                }
            });
            return splitArray;
             /* alternativ geht auch:
            return _randomArray.slice(indexOne, indexTwo)*/
        }
    
    }







}