// const allBtns = document.querySelectorAll("button");
const numberBtn = document.querySelectorAll(".number-btn");
const clearBtn = document.querySelector("#clear");
const inputMain = document.querySelector("#input-main");
const inputUpper = document.querySelector("#input-upper");
const equalsOp = document.querySelector("#equals");
const addOp = document.querySelector("#add");
const subtractOp = document.querySelector("#subtract");
const multiplyOp = document.querySelector("#multiply");
const divideOp = document.querySelector("#divide");
const backspace = document.querySelector("#backspace");
const decimal = document.querySelector("#decimal");
const clickSound = document.querySelector("#click-sound");
let currentInput = [];
let lastInput = 0;
let tempInput = 0;
let selectedOp = "";
let repeatOp = "";
let repeatCurrentInput = [];
let keyInput;
console.log(currentInput);

window.addEventListener("keydown", (e)=>{
    // console.log("KEY TEST: ", e);
    // console.log(isNaN(keyInput));
    keyInput = e.key;
    if (isNaN(keyInput) === false) {
        numberInput(keyInput);
    } else if (keyInput === ".") {
        decimalPoint();
    }

    if (keyInput === "+") {
        addition();
    } else if (keyInput === "-") {
        subtraction();
    } else if (keyInput === "*"){
        multiplication();
    } else if (keyInput === "/"){
        division();
    } else if (keyInput === "Backspace"){
        deleteFunction();
    } else if (keyInput === "c" || keyInput === "C" || keyInput === "Escape"){
        clear();
    } else if (keyInput === "=" || keyInput === "Enter") {
        equals();
    }

})
// allBtns.forEach(btn => {
//     btn.addEventListener("click", () =>{
//         buttonSound();
//     })
// })

numberBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let numberString = btn.textContent;
        numberInput(numberString);
    })
})
decimal.addEventListener("click", ()=>{
    decimalPoint();
})
// Math Operators
addOp.addEventListener("click", ()=>{
    addition();
})
subtractOp.addEventListener("click", ()=>{
    subtraction();
})
multiplyOp.addEventListener("click", ()=>{
    multiplication();
})
divideOp.addEventListener("click", ()=>{
    division();
})

clearBtn.addEventListener("click", () => {
    clear();
})
equalsOp.addEventListener("click", () =>{
    // checkError();
    equals();
})
backspace.addEventListener("click", ()=>{
    deleteFunction();
})

function updateInputMain(array){
    let string = array.join("");
    // console.log("Update display: ", string);
    inputMain.textContent = string;
}
function updateInputUpper(){
    inputUpper.textContent = `${lastInput.join("")}  ${selectedOp}`;
}
function storeLastInput(array){
    // lastInput = array.join("");
    lastInput = array;
    console.log("Last input: ", lastInput);
    currentInput = [];
}
function clear(){
    buttonSound();
    currentInput = [];
    lastInput = 0;
    selectedOp = "";
    updateInputMain(currentInput);
    inputUpper.textContent = undefined;
    console.log(currentInput, lastInput, selectedOp);
}
function checkError(){
    if (selectedOp === "" || currentInput.length == 0 || lastInput === 0 || lastInput === NaN) {
        console.log("ERROR: Invalid Operation");
        console.log(currentInput, lastInput, selectedOp);
        clear();
        inputMain.textContent = "ERROR";
    }
}
function checkErrorOperator(){
    if (selectedOp === "" && currentInput.length == 0 && (lastInput === 0 || lastInput === NaN)) {
        console.log("ERROR: Invalid Operation");
        console.log(currentInput, lastInput, selectedOp);
        clear();
        inputMain.textContent = "ERROR";
    }
}
function calculate() {
    buttonSound();
    checkError();
    if(currentInput == "0" && selectedOp == "/"){
        console.log("I AM ZERO");
        inputMain.textContent = "INFINITY & BEYOND";
        // clear();
        console.log(currentInput, lastInput, selectedOp);
        return lastInput = 0;
    } else{
        console.log("current, last, operator: ", currentInput, lastInput, selectedOp);
        let result = (lastInput.length === 1) ? 
                    operate(lastInput, selectedOp, currentInput.join("")) : 
                    operate(lastInput.join(""), selectedOp, currentInput.join(""));
        // result2 = Math.round(result * 10000)/10000;
        console.log("Result: ", result);
        lastInput = result.toString().split("");
        updateInputMain(lastInput);
        console.log("Last input: ", lastInput);
        return lastInput;
    }
}

function repeat(){
        buttonSound();
        console.log("repeatCurrent, last, repeatOperator: ", repeatCurrentInput, lastInput, repeatOp);
        let result = (lastInput.length === 1) ? 
                    operate(lastInput, repeatOp, repeatCurrentInput.join("")) : 
                    operate(lastInput.join(""), repeatOp, repeatCurrentInput.join(""));
        // result2 = Math.round(result * 100)/100;
        console.log("Result: ", result);
        lastInput = result.toString().split("");
        updateInputMain(lastInput);
        return lastInput;
}
function numberInput(numberString){
    buttonSound();
    let n = currentInput.length;
        for (i=0;i<=n; i++){
            if (currentInput[i] === undefined){
                currentInput[i] = numberString;
                // console.log(numberString);
                // console.log(typeof(numberString));
                updateInputMain(currentInput);
            } else{
                // console.log(currentInput);
                continue;
                // console.log("I AM HERE")
                
            }
        }
}
function equals(){
    if (selectedOp === "" && currentInput.length === 0){
        console.log("REPEAT ROUTE");
        console.log("last input: ", lastInput);
        let repeatResult = repeat();
        console.log("repeat result: ", repeatResult);
        console.log("last input after repeat: ", lastInput);
    } else{
        console.log( "lastInput: ", lastInput);
        console.log("currentInput: ", currentInput);
        lastInput = calculate();
        // console.log("Result: ", lastInput);
        // console.log("Result length: ", lastInput.length);
        repeatCurrentInput = currentInput;
        repeatOp = selectedOp;
        selectedOp = "";
        currentInput = [];
    }
}

function addition(){
    buttonSound();
    checkErrorOperator();
    if (selectedOp === "" && lastInput === 0 && currentInput.length != 0){
        storeLastInput(currentInput);
        selectedOp = "+";
        // lastInput = calculate();
        currentInput = [];
        console.log("Line 120: Addition route IF");
    } else if(selectedOp === "" && currentInput.length == 0){
        selectedOp = "+";
    } else {
        console.log("Line 46");
        console.log("current, last, operator: ", currentInput, lastInput, selectedOp);
        lastInput = calculate();
        console.log("Line 48");
        selectedOp = "+";
        // let result = lastInput;
        updateInputUpper();
        currentInput = [];
        updateInputMain(currentInput);
        // console.log("Chain operation: ", lastInput);
    }
}
function subtraction(){
    buttonSound();
    checkErrorOperator();
    if (selectedOp === "" && lastInput === 0 && currentInput.length != 0){
        storeLastInput(currentInput);
        selectedOp = "-";
        // lastInput = calculate();
        currentInput = [];
    } else if(selectedOp === "" && currentInput.length == 0){
        selectedOp = "-";
    } else {
        lastInput = calculate();
        selectedOp = "-";
        // let result = lastInput;
        updateInputUpper();
        currentInput = [];
        updateInputMain(currentInput);
        console.log("Chain operation: ", lastInput);
    }
}
function multiplication(){
    buttonSound();
    checkErrorOperator();
    if (selectedOp === "" && lastInput === 0 && currentInput.length != 0){
        storeLastInput(currentInput);
        selectedOp = "*";
        // lastInput = calculate();
        currentInput = [];
    } else if(selectedOp === "" && currentInput.length == 0){
        selectedOp = "*";
    } else {
        lastInput = calculate();
        selectedOp = "*";
        // let result = lastInput;
        updateInputUpper();
        currentInput = [];
        updateInputMain(currentInput);
        console.log("Chain operation: ", lastInput);
    }
}
function division(){
    buttonSound();
    checkErrorOperator();
    if (selectedOp === "" && lastInput === 0 && currentInput.length != 0){
        console.log("LINE 114");
        storeLastInput(currentInput);
        selectedOp = "/";
        // lastInput = calculate();
        currentInput = [];
    } else if(selectedOp === "" && currentInput.length == 0){
        selectedOp = "/";
    } else {
        console.log("currentInput: ", currentInput);
        console.log("LINE 124");
        console.log(currentInput);
        lastInput = calculate();
        selectedOp = "/";
        // let result = lastInput;
        updateInputUpper();
        currentInput = [];
        updateInputMain(currentInput);
        console.log("Chain operation: ", lastInput);
    }
}
function deleteFunction(){
    buttonSound();
    let n = currentInput.length;
    if (n === 0){
        return;
    }
    console.log("Current input length: ", n);
    console.log("Current input value: ", currentInput[n-1]);
    currentInput.splice(n-1, 1);
    updateInputMain(currentInput);
    // console.log("Splice input value: ", currentInput[n-1]);
}
function decimalPoint(){
    buttonSound();
    let n = currentInput.length;
    let decimalFound = false;
    for (i=0; i<=n; i++){
        // loop to search for decimal here
        if (currentInput[i] === "."){
            decimalFound = true;
            return;
        }
    }
    if (decimalFound === false && n === 0){
        currentInput[n] = "0"; currentInput[n+1] = ".";
        console.log("number = 0.X"); 
    } else if (decimalFound === false){
        currentInput[n] = ".";
    } else{
        return;
    }
}
function buttonSound(){
    clickSound.play();
}
function operate (a, b, c){
    a = parseFloat(a);
    c = parseFloat(c);
    let result;
    if (b === `+`){
        console.log(`${a} \+ ${c}`);
        result = add(a, c);
    } else if (b === `-`){
        console.log(`${a} \- ${c}`);
        result = subtract(a, c);
    } else if (b === `*`){
        console.log(`${a} \* ${c}`);
        result = multiply(a, c);
    } else if (b === `/`){
        console.log(`${a} \/ ${c}`);
        result = divide(a, c);
    } else {
        console.log("Error, invalid operation");
        return;
    }
    return Math.round(result * 10000)/10000;
}
function add (a, b) {
	return (a + b);
}

function subtract (a, b) {
	return a - b;
}

function sum (a) {
	n = a.length;
	sum = 0;
	for (i=0; i<n;i++){
		sum += a[i];
	}
	return sum;
}

function multiply (a, b) {
	return a * b;
}

function divide (a, b) {
    return a / b;
}

function power(a, b) {
	return a**b;
}

function factorial(a) {
	let factorial = 1;
	let n = a;
	for (i=0; i<n; i++){
		factorial *= (i + 1);
	}
	return factorial;
}