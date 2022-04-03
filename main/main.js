let a = 8;
let b = 5;
//for addition
const addition = require("./add");
console.log("addition:", addition(a, b));

//for subtraction
const subtraction = require("./subtract");
console.log("Subtraction:", subtraction(a, b));

//for multiplication
const multiplication = require("./multiply");
console.log("multiply:", multiplication(a, b));

//for division
const division = require("./divide");
console.log("Division:", division(a, b));