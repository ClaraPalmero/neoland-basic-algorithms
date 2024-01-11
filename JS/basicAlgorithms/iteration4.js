//* -----------------------Iteración #4: ARRAYS-----------------------------------------------------------------------------------------------------

//!----------------------------------------------------------------------------------------------
//? 1.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.

//const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

//!----------------------------------------------------------------------------------------------

//console.log(avengers[0]);

//!----------------------------------------------------------------------------------------------
//? 1.2 Cambia el primer elemento de avengers a "IRONMAN"
//!----------------------------------------------------------------------------------------------

const avengersArray = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
avengersArray[0] = "IRONMAN";
//console.log('avengersArray[0], avengersArray[1], avengersArray[2]');

//!----------------------------------------------------------------------------------------------
//? 1.3 console numero de elementos en el array usando la propiedad correcta de Array.
const avengers = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
//!----------------------------------------------------------------------------------------------

console.log(avengers.length);

//!----------------------------------------------------------------------------------------------
//? 1.4 Añade 2 elementos al array: "Morty" y "Summer".
//Muestra en consola el último personaje del array
const rickAndMortyCharacters = ["Rick", "Beth", "Jerry"];
//!----------------------------------------------------------------------------------------------
rickAndMortyCharacters.push("Morty");
rickAndMortyCharacters.push("Summer");
console.log(rickAndMortyCharacters[4]);

//!----------------------------------------------------------------------------------------------
//? 1.5 Elimina el último elemento del array y muestra el primero y el último por consola.
//const rickAndMortyCharacters1 = ["Rick","Beth","Jerry","Morty","Summer","Lapiz Lopez",];
//!----------------------------------------------------------------------------------------------

const rickAndMortyCharacters1 = [
  "Rick",
  "Beth",
  "Jerry",
  "Morty",
  "Summer",
  "Lapiz Lopez",
];
rickAndMortyCharacters1.pop();
console.log(rickAndMortyCharacters[0], rickAndMortyCharacters[4]);

//!----------------------------------------------------------------------------------------------
//? 1.6 Elimina el segundo elemento del array y muestra el array por consola.
const rickAndMortyCharacters2 = [
  "Rick",
  "Beth",
  "Jerry",
  "Morty",
  "Summer",
  "Lapiz Lopez",
];
//!----------------------------------------------------------------------------------------------

rickAndMortyCharacters2.splice(1, 1);
console.log(rickAndMortyCharacters2);
