//*--------------------------------Iteración #1: Usa includes----------------------------------------------------------

//! Haz un bucle y muestra por consola todos aquellos valores del array que incluyan la palabra "Camiseta". Usa la función .***includes*** de javascript.


//!   ERROR - MIRAR

const products = [
  "Camiseta de Pokemon",
  "Pantalón coquinero",
  "Gorra de gansta",
  "Camiseta de Basket",
  "Cinrurón de Orión",
  "AC/DC Camiseta",
];

const productCamiseta = [];

for (let wordCamiseta of products) {
  if (wordCamiseta.includes("camiseta")) {
    productCamiseta.push(wordCamiseta); //-----> lanzamos a "productCamiseta" el resultado de la condición de "wordcamiseta"
  }
}
console.log(productCamiseta);

//* -----------------------------Iteración #2: Condicionales avanzados-----------------------------------------------------------

//! Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y añade la propiedad ***isApproved*** a true o false en consecuencia.
//! Una vez lo tengas compruébalo con un ***console.log***.


//!  FALTA

const alumns = [
  { name: "Pepe Viruela", T1: false, T2: false, T3: true },
  { name: "Lucia Aranda", T1: true, T2: false, T3: true },
  { name: "Juan Miranda", T1: false, T2: true, T3: true },
  { name: "Alfredo Blanco", T1: false, T2: false, T3: false },
  { name: "Raquel Benito", T1: true, T2: true, T3: true },
];

const alumnAprob = []
for( let trimestresAprobados of alumns){
  if( )
}

/***Concepto para ejercicio Iteración#2 ( Sergio ).**

Para poder recorrer un array con objetos deberás, recorrerlo con un array y por cada posición añadir una nueva propiedad a cada objeto.

- Pista: ( para añadir la propiedad dentro del objeto )

```jsx
//Pista a la hora de recorrer un array y poder meter en el objeto una nueva propiedad
//deberás asignar a ese array por indice una propiedad tal que así

nombreLista[indice].nombrePropiedad = valor;*/  



//*-----------------------------------Iteración #3: Probando For...of-----------------------------------------------------------------------

//! Usa un bucle forof para recorrer todos los destinos del array. Imprime en un ***console.log*** sus valores. Puedes usar este array:

const placesToTravel = [
  "Japon",
  "Venecia",
  "Murcia",
  "Santander",
  "Filipinas",
  "Madagascar",
];
for (let places of placesToTravel) {
  console.log("🚀 ~ places:", places);
}

//*-----------------------------------Iteración #4: Probando For...in----------------------------------------------------------------

//! Usa un for...inn para imprimir por consola los datos del alienígena. Puedes usar este objeto:

const alien = {
  name: "Wormuck",
  race: "Cucusumusu",
  planet: "Eden",
  weight: "259kg",
};
for (let datos in alien) {
  console.log("🚀 ~ datos:", datos);
}

//*-------------------------------------Iteración #5: Probando For--------------------------------------------------------------------

//! Usa un bucle **for** para recorrer todos los destinos del array y elimina los elementos que tengan el id 11 y 40. Imprime en un ***console log*** el array. Puedes usar este array:

const placesToTravel2 = [
  { id: 5, name: "Japan" },
  { id: 11, name: "Venecia" },
  { id: 23, name: "Murcia" },
  { id: 40, name: "Santander" },
  { id: 44, name: "Filipinas" },
  { id: 59, name: "Madagascar" },
];
const arrayDestinos = [];

for (i = 0; i < placesToTravel2.length; i++) {
  if (placesToTravel2[i].id != 11 && placesToTravel2[i].id != 40) {
    arrayDestinos.push(placesToTravel2[i]);
  }
}
console.log("🚀 ~ arrayDestinos:", arrayDestinos);

//*--------------------------------------------------Iteración #6: Mixed For...of e includes----------------------------------------------------------

//! Usa un bucle **for...of** para recorrer todos los juguetes y elimina los que incluyan la palabra gato. Recuerda que puedes usar la función ***.includes()*** para comprobarlo.Puedes usar este array:

const toys = [
  { id: 5, name: "Buzz MyYear" },
  { id: 11, name: "Action Woman" },
  { id: 23, name: "Barbie Man" },
  { id: 40, name: "El gato con Guantes" },
  { id: 40, name: "El gato felix" },
];

const arrayToysSinGato = []; //------------> "caja" contenedora donde irá a parar el resultado de los nuevos parámetros

for (let toy of toys) {
  if (!toy.name.includes("gato")) {
    //-------> ! excluye
    arrayToysSinGato.push(toy); //---------> push envia a "caja" el resultado del búcle
  }
}
console.log(arrayToysSinGato);

//*--------------------------------------------------Iteración #7: For...of avanzado-----------------------------------------------

//! Usa un bucle **for...of** para recorrer todos los juguetes y añade los que tengan más de 15 ventas (sellCount) al array popularToys. Imprímelo por consola. Puedes usar este array:

const popularToys = []; // ---------> array vacío que albergará los juguetes con más de 15 ventas
const toys2 = [
  { id: 5, name: "Buzz MyYear", sellCount: 10 },
  { id: 11, name: "Action Woman", sellCount: 24 },
  { id: 23, name: "Barbie Man", sellCount: 15 },
  { id: 40, name: "El gato con Guantes", sellCount: 8 },
  { id: 40, name: "El gato felix", sellCount: 35 },
];

for (let toys3 of toys2) {
  // ----> creo bucle para que me recorra el array
  if (toys3.sellCount > 15) {
    //-------> creamos la condicion: de la variable "toys3", clave "sellCount" solo los que sean mayores de 15
    popularToys.push(toys3); //-----> lanzamos al array vacío la variable creda en el búcle
  }
}
console.log(popularToys);



