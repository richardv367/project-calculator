const numberInput = document.querySelectorAll(".number-btn");
const clearBtn = document.querySelector("#clear");
const inputMain = document.querySelector("#input-main");
const inputUpper = document.querySelector("#input-upper");
const equalsOp = document.querySelector("#equals");
const addOp = document.querySelector("#add");
const subtractOp = document.querySelector("#subtract");
const multiplyOp = document.querySelector("#multiply");
const divideOp = document.querySelector("#divide");
const backspace = document.querySelector("#backspace");
let currentInput = [];
let lastInput = 0;
let tempInput;
let selectedOp = "";
let repeatOp = "";
let repeatCurrentInput = [];
console.log(currentInput);
numberInput.forEach(btn => {
    btn.addEventListener("click", () => {
        let n = currentInput.length;
        for (i=0;i<=n; i++){
            if (currentInput[i] === undefined){
                currentInput[i] = btn.textContent;
                updateInputMain(currentInput);
            } else{
                // console.log(currentInput);
                continue;
                // console.log("I AM HERE")
                
            }
        }
    })
})
// Math Operators
addOp.addEventListener("click", ()=>{
    // if (lastInput === 0 && currentInput.length != 0) {
    //     console.log("current and last input before store: ", currentInput, lastInput);
    //     storeLastInput(currentInput);
    //     console.log("current and last input after store: ", currentInput, lastInput);
    //     console.log("I AM HERE");
        
    // } else{
    //     checkError();
    // }
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
})
subtractOp.addEventListener("click", ()=>{
    // if (lastInput === 0) {
    //     storeLastInput(currentInput);
    // }
    // currentInput = [];
    // selectedOp = "-";
        // if (lastInput === 0 && currentInput.length != 0) {
        //     storeLastInput(currentInput);
        // } else{
        //     checkError();
        // }
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
})
multiplyOp.addEventListener("click", ()=>{
    // if (lastInput === 0 && currentInput.length != 0) {
    //     storeLastInput(currentInput);
    // } else{
    //     checkError();
    // }
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
})
divideOp.addEventListener("click", ()=>{
    // if (lastInput === 0 && currentInput.length != 0) {
    //     storeLastInput(currentInput);
    // } 
    // else{
    //     checkError();
    // }
    // && checkError() === false
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
})

clearBtn.addEventListener("click", () => {
    clear();
})
equalsOp.addEventListener("click", () =>{
    // checkError();
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
})
backspace.addEventListener("click", ()=>{
    let n = currentInput.length;
    if (n === 0){
        return;
    }
    console.log("Current input length: ", n);
    console.log("Current input value: ", currentInput[n-1]);
    currentInput.splice(n-1, 1);
    updateInputMain(currentInput);
    // console.log("Splice input value: ", currentInput[n-1]);
    
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
        result2 = Math.round(result * 100)/100;
        console.log("Result2: ", result2);
        lastInput = result2.toString().split("");
        updateInputMain(lastInput);
        console.log("Last input: ", lastInput);
        return lastInput;
    }
}

function repeat(){
        console.log("repeatCurrent, last, repeatOperator: ", repeatCurrentInput, lastInput, repeatOp);
        let result = (lastInput.length === 1) ? 
                    operate(lastInput, repeatOp, repeatCurrentInput.join("")) : 
                    operate(lastInput.join(""), repeatOp, repeatCurrentInput.join(""));
        result2 = Math.round(result * 100)/100;
        console.log("Result2: ", result2);
        lastInput = result2.toString().split("");
        updateInputMain(lastInput);
        return lastInput;
}

function operate (a, b, c){
    a = parseInt(a);
    c = parseInt(c);
    if (b === `+`){
        console.log(`${a} \+ ${c}`);
        return add(a, c);
    } else if (b === `-`){
        console.log(`${a} \- ${c}`);
        return subtract(a, c);
    } else if (b === `*`){
        console.log(`${a} \* ${c}`);
        return multiply(a, c);
    } else if (b === `/`){
        console.log(`${a} \/ ${c}`);
        return divide(a, c);
    } else {
        console.log("Error, invalid operation");
        return;
    }
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