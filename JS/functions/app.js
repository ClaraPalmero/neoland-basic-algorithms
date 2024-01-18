//*-----------------------------------Iteración #1: Buscar el máximo------------------------------------

//! Completa la función que tomando dos números como argumento devuelva el más alto.
//!------------------------------------------------------------------------------------------------------------

/*const numeroMasAltoArrow = (a, b) => a > b && b > a;

const numberOne = 4;
const numberTwo = 8;

const result = numeroMasAltoArrow(numberOne, numberTwo);
console.log(result);*/

function numberAlto(a, b) {
  if (a > b) {
    return a;
  }
  if (b > a) {
    return b;
  }
}
let resultado = numberAlto(7, 20);
console.log(resultado);

//*-----------------------------------Iteración #2: Buscar la palabra más larga------------------------------------

//! Completa la función que tomando un array de strings como argumento devuelva el más largo,
//! en caso de que dos strings tengan la misma longitud deberá devolver el primero.
//! Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const avengers = [
  "Hulk",
  "Thor",
  "IronMan",
  "Captain A.",
  "Spiderman",
  "Captain M.",
];

const nombreLargo = (array) => {
  let palabraLarga = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > palabraLarga.length) {
      palabraLarga = array[i];
    }
  }
  return palabraLarga;
};

console.log(nombreLargo(avengers));

//*-----------------------------------Iteración #3: Calcular la suma------------------------------------

//! Calcular una suma puede ser tan simple como iterar sobre un array y sumar cada uno de los elementos.
//! Implemente la función denominada sumNumbers que toma un array de números como argumento y devuelve la suma de todos los números de la matriz.
//! Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const numbers = [1, 2, 3, 5, 45, 37, 58];

const sumAll = (param) => {
  let suma = param.reduce((numA, numB) => numA + numB, 0);
  return suma;
};

console.log(sumAll(numbers));

//*-----------------------------------Iteración #4: Calcular el promedio------------------------------------

//! Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const numbers1 = [12, 21, 38, 5, 45, 37, 6];
const average = (param) => {
  let suma = param.reduce((numA, numB) => numA + numB, 0);
  const promedio = suma / numbers1.length;
  return promedio;
};
let resultado2 = average(numbers1);
console.log(resultado2);

//*-----------------------------------Iteración #5: Calcular promedio de strings------------------------------------

//! Crea una función que reciba por parámetro un array y cuando es un valor number lo sume y de lo contrario cuente la longitud del string y lo sume.
//! Puedes usar este array para probar tu función:
//!--------------------------------------------------------------------------------------------------------------------------------------------------------------

/*const mixedElements = [6, 1, "Rayo", 1, "vallecano", "10", "upgrade", 8, "hub"];

const averageWord = (mixedElements) => {
  let numero = 0;
  let letras = 0;

  for (let i = 0; i < mixedElements.length; i++);
  {
    // empieza por la posición 0 y coje todo el array,  i < mixedElements.length -------> nos pone fin en la longitud del array
    if (typeof mixedElements[i] === "number") {
      numero = mixedElements[i] + numero;
    } else if (typeof mixedElements[i] === "string") {
      letras = mixedElements[i].length + letras;
    }
  }
  return numero + letras;
};
let resultado3 = averageWord(mixedElements);
console.log("🚀 ~ resultado3 :", resultado3);*/

//*-----------------------------------Iteración #6: Valores únicos------------------------------------

//! Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, en caso que existan los elimina para retornar
//! un array sin los elementos duplicados. Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const duplicates = [
  "sushi",
  "pizza",
  "burger",
  "potatoe",
  "pasta",
  "ice-cream",
  "pizza",
  "chicken",
  "onion rings",
  "pasta",
  "soda",
];
const removeDuplicates = (param) => {
  const unicas = [];
  for (let i = 0; i < duplicates.length; i++) {
    if (!duplicates.includes(unicas[i]));
    unicas.push(duplicates[i]); //------> si el valor en el índice i del array duplicates NO está presente en unicas
  }
  return unicas;
  console.log("🚀 ~ removeDuplicates ~ unicas:", unicas);
};
let resultadosIteraciones6 = removeDuplicates(duplicates);
console.log(resultadosIteraciones6);

/* const new array =[]
duplicates.foreach((item) =>{
  if(!newArray.includes(item)) {
    newArray.push(item)
  }
})

console.log(newArray)

*/

//*-----------------------------------Iteración #7: Buscador de nombres------------------------------------

//! Crea una función que reciba por parámetro un array y el valor que desea comprobar que existe dentro de dicho array
//! - comprueba si existe el elemento, en caso que existan nos devuelve un true y la posición de dicho elemento y por la contra un false.
//! Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const nameFinder = [
  "Peter",
  "Steve",
  "Tony",
  "Natasha",
  "Clint",
  "Logan",
  "Xabier",
  "Bruce",
  "Peggy",
  "Jessica",
  "Marc",
];
function finderName(param) {
nameFinder.forEach((item) =>{


})
   

console.log(finderName);

//*-----------------------------------Iteration #8: Contador de repeticiones------------------------------------

//! Crea una función que nos devuelva el número de veces que se repite cada una de las palabras que lo conforma.
//! Puedes usar este array para probar tu función:
//!------------------------------------------------------------------------------------------------------------

const counterWords = [
  "code",
  "repeat",
  "eat",
  "sleep",
  "code",
  "enjoy",
  "sleep",
  "code",
  "enjoy",
  "upgrade",
  "code",
];
function repeatCounter(param) {
  // insert code
}