function add(number1,number2) {return number1+number2};
function subtract(number1,number2) {return number1-number2};
function divide(number1,number2) {return number1/number2};
function multiply(number1,number2) {return number1*number2};

let firstNumbers = "";
let lastNumbers = "";
let operator = null;

function operate(firstNum,lastNum,oper) {
    switch(oper) {
        case '+':
            return add(firstNum,lastNum);
        case "-":
            return subtract(firstNum,lastNum);
        case "*":
            return multiply(firstNum,lastNum);
        case "/":
            return divide(firstNum,lastNum);
    }
}
const divNumbers = document.querySelector("#number");
const divOperators = document.querySelector("#operator");
const display = document.querySelector("#display");
const body = document.querySelector("body");
const upper = ["C","Del","."];

for (op in upper) {
    let oper = document.createElement("button");
    oper.textContent = upper[op];
    if (upper[op] == "C") {oper.setAttribute("id","clear")};
    if (upper[op] == "Del") {oper.setAttribute("id","del")};
    oper.classList.add("numbers");
    divNumbers.appendChild(oper);
};
const KEYS = [7,8,9,4,5,6,1,2,3,0];
for (i of KEYS) {
    let digit = document.createElement("button");
    digit.textContent = i;
    if (i == 0) {digit.setAttribute("id","zero")};
    digit.classList.add("numbers");
    divNumbers.appendChild(digit);
}
const OPERATORS = ["/","*","-","+","="];
const OPERATORS_RESULT = ["+","-","/","*"];
for (op in OPERATORS) {
    let oper = document.createElement("button");
    oper.textContent = OPERATORS[op];
    if (OPERATORS[op] == "=") {oper.setAttribute("id","equals")};
    oper.classList.add("operators");
    divOperators.appendChild(oper);
}
function displayNumbers () {
    calculator.addEventListener("click",(e) => {
        let text = e.target.textContent;
        if (e.target == display || e.target == calculator) {text = ""};
        if (e.target.textContent == "Del") {firstNumbers = firstNumbers.slice(0,-1), text = ""};
        if (e.target.textContent == "=") {text = ""};
        firstNumbers += text;
        if (e.target.textContent == "C") {firstNumbers = ""}
        display.style.fontSize = "50px"
        if (firstNumbers.length > 17 && firstNumbers.length < 25) {display.style.fontSize = "35px"}
        if (firstNumbers.length > 24 && firstNumbers.length < 35) {display.style.fontSize = "25px"}
        if (firstNumbers.length > 34) {display.style.fontSize = "15px"}
        display.textContent = firstNumbers;
    });
}
displayNumbers()
function displayResult () {
    let first = [];
    let opt = 0;
    let last = [];
    let total = 0;
    for (let i = 0; i<firstNumbers.length; i++) {
        let char = firstNumbers[i];
        if (!OPERATORS_RESULT.includes(char) && opt == 0) {
            first.push(char);
        }
        else if (OPERATORS_RESULT.includes(char) && first.length == 0) {
            first.push(String(char));
        }
        else if (OPERATORS_RESULT.includes(char) && last.length == 0 && opt != 0) {
            last.push(String(char));
        }
        else if (OPERATORS_RESULT.includes(char) && opt == 0) {
            opt = char;
        }
        else if (!OPERATORS_RESULT.includes(char) && opt != 0) {
            last.push(char);
        }
        else if (OPERATORS_RESULT.includes(char) && opt != 0) {
            if (Math.floor(operate(parseFloat(first.join("")),parseFloat(last.join("")),opt)*100)/100 == Infinity) {
                return firstNumbers = "", alert("Can't divide by 0");
            };
            first = [Math.floor(operate(parseFloat(first.join("")),parseFloat(last.join("")),opt)*100)/100];
            opt = char;
            last = [];
        };
        };
    if (Math.floor(operate(parseFloat(first.join("")),parseFloat(last.join("")),opt)*100)/100 == Infinity) {
        return alert("Can't divide by 0"),firstNumbers = "";
    }
    else if (Number.isNaN(Math.floor(operate(parseFloat(first.join("")),parseFloat(last.join("")),opt)*100)/100)) {
        return alert("Wrong input");
    };
    firstNumbers = Math.floor(operate(parseFloat(first.join("")),parseFloat(last.join("")),opt)*100)/100
};
const equals = document.querySelector("#equals");
equals.addEventListener("click", displayResult);

body.addEventListener("keydown", (e) => {
    let text = e.key;
    if (!OPERATORS_RESULT.includes(text) && !KEYS.includes(parseInt(text)) && text != "Backspace" && text != "Enter" && text !="Delete" && text != ".") {
        text = "";
    };
    if (text == "Backspace") {firstNumbers = firstNumbers.slice(0,-1), text = ""};
    if (text == "Enter") {text = "",displayResult()};
    firstNumbers += text;
    if (text == "Delete") {firstNumbers = ""}
    display.style.fontSize = "50px"
    if (firstNumbers.length > 17 && firstNumbers.length < 25) {display.style.fontSize = "35px"}
    if (firstNumbers.length > 24 && firstNumbers.length < 35) {display.style.fontSize = "25px"}
    if (firstNumbers.length > 34) {display.style.fontSize = "15px"}
    display.textContent = firstNumbers;
})