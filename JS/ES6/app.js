//*------------------------------------Iteración #1: Arrows---------------------------------

// //! Crea una arrow function que tenga dos parametros a y b y que por defecto el valor de a = 10 y de b = 5.
// //! Haz que la función muestre por consola la suma de los dos parametros.

// //!  1.1 Ejecuta esta función sin pasar ningún parametro

const sumarParam = (a = 10, b = 5) => {
  console.log(a + b);
};
sumarParam();

// //!  1.2 Ejecuta esta función pasando un solo parametro

sumarParam(9); // --------------> al ser un único parametro coje la posición de "a", (9 + b = 14)

// //!  1.3 Ejecuta esta función pasando dos parametros

sumarParam(6, 3);

// //*------------------------------------Iteración #2: Destructuring---------------------------------------------

// //! 2.1 En base al siguiente javascript, crea variables en base a las propiedades del objeto usando object destructuring e imprimelas por consola.
// //! Cuidado, no hace falta hacer destructuring del array, solo del objeto.

const game = {
  title: "The last us 2",
  gender: ["action", "zombie", "survival"],
  year: 2020,
};

const { title, gender, year } = game;
console.log("🚀 ~ year:", year);
console.log("🚀 ~ gender:", gender);
console.log("🚀 ~ title:", title);

// //! 2.2 En base al siguiente javascript, usa destructuring para crear 3 variables llamadas fruit1, fruit2 y fruit3, con los valores del array. Posteriormente imprímelo por consola.

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
console.log(animalFunction);

// //! 2.4 En base al siguiente javascript, usa destructuring para crear las variables name y itv con sus respectivos valores. Posteriormente crea 3 variables usando igualmente
// //! el destructuring para cada uno de los años y comprueba que todo esta bien imprimiendolo.

const car = { name2: "Mazda 6", itv: [2015, 2011, 2020] };
const { name2, itv } = car;
const [year1, year2, year3] = itv;
console.log(year1);
console.log(year2);
console.log(year3);
console.log(car);

//* ------------------------------------Iteración #3: Spread Operator---------------------------------------------

//! 3.1 Dado el siguiente array, crea una copia usando spread operators.

const pointsList0 = [32, 54, 21, 64, 75, 43];
const copiPointList0 = [...pointsList0];
console.log(copiPointList0);

// //! 3.2 Dado el siguiente objeto, crea una copia usando spread operators.
const toy2 = { name: "Bus laiyiar", date: "20-30-1995", color: "multicolor" };
const copiaToy2 = { ...toy2 };
console.log(copiaToy2);

// //! 3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando spread operators.

const pointsList = [32, 54, 21, 64, 75, 43];
const pointsList2 = [54, 87, 99, 65, 32];

const concatPointList = [...pointsList, ...pointsList2];
console.log(concatPointList);

// //! 3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos con spread operators.

const toy = { name: "Bus laiyiar", date: "20-30-1995", color: "multicolor" };
const toyUpdate = { lights: "rgb", power: ["Volar like a dragon", "MoonWalk"] };

const fusion = { ...toy, ...toyUpdate };
console.log(fusion);

// //! 3.5 Dado el siguiente array. Crear una copia de él eliminando la posición 2
// //! pero sin editar el array inicial. De nuevo, usando spread operatos.

const colors = ["rojo", "azul", "amarillo", "verde", "naranja"];
const copiaColors = [...colors.slice(0, 2), ...colors.slice(3)];

console.log(colors, copiaColors);

// //*--------------------------Iteración #4: Map------------------------------------------------------

// //! 4.1 Dado el siguiente array, devuelve un array con sus nombres utilizando .map().

const users2 = [
  { id: 1, name: "Abel" },
  { id: 2, name: "Julia" },
  { id: 3, name: "Pedro" },
  { id: 4, name: "Amanda" },
];

const arrayNames = users2.map((nombres) => nombres.name);
console.log(arrayNames);

// //! 4.2 Dado el siguiente array, devuelve una lista que contenga los valores de la propiedad .name y cambia el nombre a 'Anacleto' en caso de que
// //! empiece por 'A'.
const users = [
  { id: 1, name: "Abel" },
  { id: 2, name: "Julia" },
  { id: 3, name: "Pedro" },
  { id: 4, name: "Amanda" },
];

const changeName = users.map((user) => {
  //----> con el map recorremos el array. se crea una función
  if (user.name.startsWith("A")) {
    user.name = "Anacleto";
  }
  return user.name;
});

console.log(changeName);

// //! 4.3 Dado el siguiente array, devuelve una lista que contenga los valores de la propiedad .name y añade al valor de .name el string ' (Visitado)'
// //! cuando el valor de la propiedad isVisited = true.

// //!    ERROR ---- MIRAR

// const cities = [
//   { isVisited: true, name: "Tokyo" },
//   { isVisited: false, name: "Madagascar" },
//   { isVisited: true, name: "Amsterdam" },
//   { isVisited: false, name: "Seul" },
// ];
// /*const newList = [];
// const listVisited = cities.map((nombre) => {
//   if (nombre.isVisited === true) {
//     nombre.name = cities.name.push("Visitado");
//   }
//   return nombre.name;
// });
// console.log(listVisited);*/

// //*----------------------------------Iteración #5: Filter-----------------------------------

// //! 5.1 Dado el siguiente array, utiliza .filter() para generar un nuevo array con los valores que sean mayor que 18.

const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
const mayorEdad = ages.filter((number) => number > 18);
console.log(mayorEdad);

// //! 5.2 Dado el siguiente array, utiliza .filter() para generar un nuevo array con los valores que sean par.

const ages2 = [22, 14, 24, 55, 65, 21, 12, 13, 90];

const evenNumbers = ages2.filter((number) => number % 2 === 0);
console.log(evenNumbers);

// //! 5.3 Dado el siguiente array, utiliza .filter() para generar un nuevo array con los streamers que tengan el gameMorePlayed = 'League of Legends'.

const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];

const newStreamers = streamers.filter((nombre) => {
  return nombre.gameMorePlayed.includes("League of Legends");
});
console.log(newStreamers);

// //! 5.4 Dado el siguiente array, utiliza .filter() para generar un nuevo array con los streamers que incluyan el caracter 'u' en su propiedad .name.
// //! Recomendamos usar la funcion .includes() para la comprobación.

const streamers2 = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];

const newArray = streamers2.filter((nombre) => {
  return nombre.name.includes("u");
});
console.log(newArray);

// //! 5.5 utiliza .filter() para generar un nuevo array con los streamers que incluyan el caracter 'Legends' en su propiedad .gameMorePlayed.
// //! Recomendamos usar la funcion .includes() para la comprobación. Además, pon el valor de la propiedad .gameMorePlayed a MAYUSCULAS cuando
// //! .age sea mayor que 35.

// //!    ERROR------------------------------------------------------------
// const streamersLegends = streamers2.filter((streamer) => {
//   if (streamer.gameMorePlayed.includes("Legends")) {
//     if (streamers2.age > 35) {
//       streamer.gameMorePlayed = streamer.gameMorePlayed.toUpperCase();
//     }
//     return true;
//   }
//   return false;
// });

// console.log(streamersLegends);

// /*
// //! 5.6 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola los streamers que incluyan la palabra introducida en el input.
// //! De esta forma, si introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si introduzco 'i', me deberia de mostrar el streamer 'Rubius' e
// //!'Ibai'.

// const streamers3 = [
// 	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
// 	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
// 	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
// 	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
// ];

// <!doctype html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
//              <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
//              <meta http-equiv="X-UA-Compatible" content="ie=edge">
//              <title>Document</title>
// </head>
// <body>
//   <input type="text" data-function="toFilterStreamers"/>
// </body>
// </html>

// /* 5.7 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola
// los streamers que incluyan la palabra introducida en el input. De esta forma, si
// introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si introduzco 'i',
// me deberia de mostrar el streamer 'Rubius' e 'Ibai'.
// En este caso, muestra solo los streamers filtrados cuando hagamos click en el button.
// const streamers = [
// 	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
// 	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
// 	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
// 	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
// ];

// <!doctype html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
//              <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
//              <meta http-equiv="X-UA-Compatible" content="ie=edge">
//              <title>Document</title>
// </head>
// <body>
//   <input type="text" data-function="toFilterStreamers"/>
//   <button data-function="toShowFilterStreamers">Filter</button>
// </body>
// </html>

// */

//*---------------------------------Iteración #6: Find---------------------------------------------------

//! 6.1 Dado el siguiente array, usa .find() para econtrar el número 100.

const numbers = [32, 21, 63, 95, 100, 67, 43];
const finsNumber = numbers.find((number) => number === 100);
console.log(finsNumber);

//!6.2 Dado el siguiente array, usa .find() para econtrar la pelicula del año 2010.
const movies = [
  { title: "Madagascar", stars: 4.5, date: 2015 },
  { title: "Origen", stars: 5, date: 2010 },
  { title: "Your Name", stars: 5, date: 2016 },
];

const findFilm = movies.find((user) => user.date === 2010);
console.log(findFilm);

//! 6.3 Dado el siguiente javascript, usa .find() para econtrar el alien de nombre'Cucushumushu' y la mutación 'Porompompero'.
//! Una vez que los encuentres, usa spread operator para fusionarlos teniendo en cuenta que el objeto de la mutación
//! lo queremos meter en la propiedad .mutation del objeto fusionado.

const aliens = [
  { name: "Zalamero", planet: "Eden", age: 4029 },
  { name: "Paktu", planet: "Andromeda", age: 32 },
  { name: "Cucushumushu", planet: "Marte", age: 503021 },
];
const mutations = [
  {
    name: "Porompompero",
    description:
      "Hace que el alien pueda adquirir la habilidad de tocar el tambor",
  },
  {
    name: "Fly me to the moon",
    description: "Permite volar, solo y exclusivamente a la luna",
  },
  {
    name: "Andando que es gerundio",
    description: "Invoca a un señor mayor como Personal Trainer",
  },
];

const alien2 = aliens.find((alien) => alien.name === "Cucushumushu");
const newMutation = mutations.find(
  (mutation) => mutation.name === "Porompompero"
);

const fusion2 = { ...alien2, mutation: newMutation };
console.log(fusion2);

//*-------------------------------Iteración #7: Reduce--------------------------

//! 7.1 Dado el siguiente array, haz una suma de todos las notas de los examenes de los alumnos usando la función .reduce().

const exams = [
  { name: "Yuyu Cabeza Crack", score: 5 },
  { name: "Maria Aranda Jimenez", score: 1 },
  { name: "Cristóbal Martínez Lorenzo", score: 6 },
  { name: "Mercedez Regrera Brito", score: 7 },
  { name: "Pamela Anderson", score: 3 },
  { name: "Enrique Perez Lijó", score: 6 },
  { name: "Pedro Benitez Pacheco", score: 8 },
  { name: "Ayumi Hamasaki", score: 4 },
  { name: "Robert Kiyosaki", score: 2 },
  { name: "Keanu Reeves", score: 10 },
];

const sumaAlumnos = exams.reduce((acc, notas) => acc + notas.score, 0);
console.log(sumaAlumnos);

//! 7.2 Dado el mismo array, haz una suma de todos las notas de los examenes de los alumnos que esten aprobados usando la función .reduce().

const alumnosAprobados = exams.reduce((acc, notas)=> acc >= )

//!7.3 Dado el mismo array, haz la media de las notas de todos los examenes .reduce().

//*-----------------------------Iteración #8: Bonus-----------------------------------------------------

//! 6.1 Dado el siguiente javascript filtra los videojuegos por gender = 'RPG' usando.filter() y usa .reduce() para conseguir la media de sus .score.
//! La función .find() también podría ayudarte para el contrar el genero 'RPG' en el array .gender.

const videogames = [
  { name: "Final Fantasy VII", genders: ["RPG"], score: 9.5 },
  { name: "Assasins Creed Valhala", genders: ["Aventura", "RPG"], score: 4.5 },
  { name: "The last of Us 2", genders: ["Acción", "Aventura"], score: 9.8 },
  { name: "Super Mario Bros", genders: ["Plataforma"], score: 8.5 },
  { name: "Genshin Impact", genders: ["RPG", "Aventura"], score: 7.5 },
  {
    name: "Legend of Zelda: Breath of the wild",
    genders: ["RPG", "La cosa más puto bonita que he visto nunca"],
    score: 10,
  },
];
