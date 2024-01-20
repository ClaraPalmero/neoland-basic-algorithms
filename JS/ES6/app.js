//*------------------------------------Iteración #1: Arrows---------------------------------

//! Crea una arrow function que tenga dos parametros a y b y que por defecto el valor de a = 10 y de b = 5.
//! Haz que la función muestre por consola la suma de los dos parametros.

//!  1.1 Ejecuta esta función sin pasar ningún parametro

const sumarParam = (a = 10, b = 5) => {
  console.log(a + b);
};
sumarParam();

//!  1.2 Ejecuta esta función pasando un solo parametro

sumarParam(9); // --------------> al ser un único parametro coje la posición de "a", (9 + b = 14)

//!  1.3 Ejecuta esta función pasando dos parametros
sumarParam(6, 3);

//*------------------------------------Iteración #2: Destructuring---------------------------------------------

//! 2.1 En base al siguiente javascript, crea variables en base a las propiedades del objeto usando object destructuring e imprimelas por consola.
//! Cuidado, no hace falta hacer destructuring del array, solo del objeto.

const game = {
  title: "The last us 2",
  gender: ["action", "zombie", "survival"],
  year: 2020,
};

const { title, gender, year } = game;
console.log("🚀 ~ year:", year);
console.log("🚀 ~ gender:", gender);
console.log("🚀 ~ title:", title);

//! 2.2 En base al siguiente javascript, usa destructuring para crear 3 variables llamadas fruit1, fruit2 y fruit3, con los valores del array. Posteriormente imprímelo por consola.

const fruits = ["Banana", "Strawberry", "Orange"];

const [fruit1, fruit2, fruit3] = fruits;
console.log("🚀 ~ fruit3:", fruit3);
console.log("🚀 ~  fruit2:", fruit2);
console.log("🚀 ~ fruit1:", fruit1);

//! 2.3 En base al siguiente javascript, usa destructuring para crear 2 variables igualándolo a la función e imprimiéndolo por consola.

const animalFunction = () => {
  return { name: "Bengal Tiger", race: "Tiger" };
};
const { name, race } = animalFunction;
console.log(name);

//! 2.4 En base al siguiente javascript, usa destructuring para crear las variables name y itv con sus respectivos valores. Posteriormente crea 3 variables usando igualmente
//! el destructuring para cada uno de los años y comprueba que todo esta bien imprimiendolo.

const car = { name2: "Mazda 6", itv: [2015, 2011, 2020] };
const { name2, itv } = car;
const [a, b, c] = itv;
console.log(a);
console.log(b);
console.log(c);
console.log(name2);
console.log(itv);


//* ------------------------------------Iteración #3: Spread Operator---------------------------------------------


//! 3.1 Dado el siguiente array, crea una copia usando spread operators.

const pointsList0 = [32, 54, 21, 64, 75, 43]
const copiPointList0 = [...pointsList0]
console.log(copiPointList0)



//! 3.2 Dado el siguiente objeto, crea una copia usando spread operators.
const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};

//! 3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando 
spread operatos.
const pointsList = [32, 54, 21, 64, 75, 43];
const pointsLis2 = [54,87,99,65,32];

//! 3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos 
con spread operators.
const toy = {name: 'Bus laiyiar', date: '20-30-1995', color: 'multicolor'};
const toyUpdate = {lights: 'rgb', power: ['Volar like a dragon', 'MoonWalk']}

//! 3.5 Dado el siguiente array. Crear una copia de él eliminando la posición 2 
pero sin editar el array inicial. De nuevo, usando spread operatos.
const colors = ['rojo', 'azul', 'amarillo', 'verde', 'naranja'];