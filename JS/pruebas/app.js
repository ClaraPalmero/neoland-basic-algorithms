//!   CONDICIONALES

const age = 18;
console.log(age);
if (age >= 18) {
  console.log("mayor de edad");
}

let dato = 10;
let x = 11;

if (x === dato) {
  console.log("Valido");
} else {
  console.log("Wrong");
}

if (x === dato) {
  console.log("Valido");
} else if (x > dato) {
  console.log("Aceptable");
} else {
  console.log("Worng");
}

// Ternario

let a = 18;
let b = 20;
let result = a > b ? true : false;
console.log(result);

let chica1 = "Clara";
let chica2 = "Laura";
let chica3 = "Anna";

// Switch

switch (chica1) {
  case "Clara":
    console.log("Inglés");
    break;
  case "poli":
    console.log("urbana");
    break;
  default:
    console.log("no tiene profesion");
    break;
}

//!   MÉTODOS
/*
String
    1.Length
    2.Includes
    3.Repeat
    4.Replace
    5.replaceAll
    6.Slice
    7.Split
    8.toLowerCase
    9.toUpperCare
    10.Trim

*/

// 1.lenght - para saber la longitud de un string

let nameOk = "Clara";

console.log(nameOk.length);

// 2.includes - para encontrar un string dentro de otro string. BOOLEAN.

let sentence = "Clara Palmero está estudiando programación";
let word = "estudiando";
let word2 = "futuro";
console.log(sentence.includes(word));
console.log(sentence.includes(word2));

// 3.repeat - devuelve el número de copias del string al cual aplicamos el .repeat

console.log(sentence.repeat(2));
console.log(word.repeat(2));

// 4.replace - sustituye un argumento por otro

let sentence1 = "Clara tiene una casa, Clara estudia mucho.";
let word3 = "Marina";
console.log(sentence1.replace("Clara", "Marina"));

// 5.replaceAll - sustituye todos los elementos que coinciden

console.log(sentence1.replaceAll("Clara", word3));

//6.slice - extrae la porción indicada del string

console.log(sentence1.slice(11, 21));

//7.split - crea un array de tantos elementos como indiques

console.log(sentence1.split(" ", 7));

//8.toLowerCase - pasa todo el string a minúsculas

console.log(sentence1.toLocaleLowerCase());

//9.toUpperCase - pasa todo el string a mayúsculas

console.log(sentence1.toLocaleUpperCase());

//10.trim - elimina espacios en blanco

let sentence2 = "   Clara tiene una casa, Clara estudia      mucho.";
console.log(sentence1.trim());

/* Numbers
1.isNan
2.isInteger
3.parseInt
4.parseFloat
5.toString

*/

//1.isNaN - sirve para verificar si un valor no es un número. BOOLEANO.

let number = 48;
let word4 = "Hola";
console.log(isNaN(number));
console.log(isNaN(word4));

//2.isInteger - nos indica si un número es entero. BOOLEANO.

let number2 = 22.222;
console.log(Number.isInteger(number2));

//3.parseInt - pasa un string a number entero

let string = "666.666";
console.log(parseInt(string));

//4.parseFloat - pasa de number a string a number entero o decimal

let numberToString = "666.666";
console.log(parseFloat(numberToString));

//5. toString - convierte un number a string

let numberToString2 = 666;
let toStringResult = numberToString2.toString();
console.log(toStringResult);

/* BOOLEANS
1.tostring

*/

//1.toString - para devolver como un string el valor de una constante

const winner = true;
const winnerText = winner.toString();
console.log(winner);

const num = 88;
const cadenaNumero = num.toString();
console.log(cadenaNumero);

//!   FUNCIONES

function clara(param) {
  console.log("Guapa");
}
clara();

function showMivie(age) {
  if (!chackAge(age)) {
    return;
  }
  console.log("Mostrándote la película");
}

const getName = () => {
  console.log("Devuelve nombre");
  return "Carlos";
};
const name = getName();
console.log(name);

const numberRandom = [1, 2, 3, 4, 5, 6];
numberRandom.unshift(["lo nuevo"]);
console.log("🚀 ~ numberRandom:", numberRandom);

const saludo = ["Hola", "que", "tal?"];
const concatArray = saludo.concat(saludo);
console.log(concatArray);

const comidas = ["lentejas", "macarrones", "potaje"];
console.log(comidas.slice(0, 1));
console.log(comidas);

const comidas2 = ["lentejas", "macarrones", "potaje"];
console.log(comidas.toString());

const saludo2 = ["Hola", "que", "tal?"];
const stringSaludo = saludo.join(" ");
console.log(stringSaludo);

console.log(comidas.indexOf("lentejas"));

const random = [1, 2, 3, 4, 5, 6];
const corte = random.splice(0, 3, 234, 54);
console.log("🚀 ~ random.:", random);

// map

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map((number) => number * 2);
console.log(doubledNumbers);

// filter

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((number) => number % 2 === 0);
console.log(evenNumbers);

// find

const numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const four = numbers.find((number) => number === 4);
console.log(four);

// some

const numbers4 = [1, 2, 3, 4, 5];
const hasEvenNumbers = numbers.some((number) => number % 2 === 0);
console.log(hasEvenNumbers);

//
