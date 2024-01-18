//*--------------------------Iteración #1: Mix for e includes---------------------------------------------------

//! Dado el siguiente javascript usa forof para recorrer el array de películas, genera un nuevo array con las categorías de las películas e imprime por consola el array de categorías.
//! Ten en cuenta que las categorías no deberían repetirse. Para filtrar las categorías puedes ayudarte de la función **.includes()**

const movies = [
  { title: "Madaraspar", duration: 192, categories: ["comedia", "aventura"] },
  { title: "Spiderpan", duration: 122, categories: ["aventura", "acción"] },
  {
    title: "Solo en Whatsapp",
    duration: 223,
    categories: ["comedia", "thriller"],
  },
  {
    title: "El gato con guantes",
    duration: 111,
    categories: ["comedia", "aventura", "animación"],
  },
];

const categoriasUnicasPelis = []; //-----------> array para almacenar categorias únicas.

for (let movie of movies) {
  //-----> recorremos las películas
  for (let category of movie.categories) {
    //----------> for of anidado para recorrer las categorías de cada película
    if (!categoriasUnicasPelis.includes(category)) {
      //------> se verifica si la categoría ya está presente en 'categoríasUnicasPelis'
      categoriasUnicasPelis.push(category); //-----> si no lo está, se agrega a 'categoriasUnicasPelis'
    }
  }
}

console.log(categoriasUnicasPelis);

//*--------------------------------------------Iteración #2: Mix Fors-----------------------------------------------

//! Dado el siguiente javascript usa forof y forin para hacer la media del volumen de todos los sonidos favoritos que tienen los usuarios.

const users = [
  {
    name: "Manolo el del bombo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 50 },
      rain: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "Mortadelo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 30 },
      shower: { format: "ogg", volume: 55 },
      train: { format: "mp3", volume: 60 },
    },
  },
  {
    name: "Super Lopez",
    favoritesSounds: {
      shower: { format: "mp3", volume: 50 }, //-------> shower clave i valor es el objeto
      train: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 8 },
    },
  },
  {
    name: "El culebra",
    favoritesSounds: {
      waves: { format: "mp3", volume: 67 },
      wind: { format: "ogg", volume: 35 },
      firecamp: { format: "mp3", volume: 60 },
    },
  },
];

let volumenArray = [];
let mediaVolumen = 0;

for (let user of users) {
  const { favoritesSounds } = user; //----> destructuring (cojemos las claves de los objectos), crear una variable a través de las claves de un objeto.
  console.log("🚀 ~ favoritesSounds:", favoritesSounds);
  for (let prop in favoritesSounds) {
    volumenArray.push(prop);
    console.log("🚀 ~ volumenArray:", favoritesSounds[prop]);
    mediaVolumen += favoritesSounds[prop].volume;
  }
}
let division = mediaVolumen / users.length; //----> crear en una variable el valor de la division entra la long del array
console.log("🚀 ~ division:", division);

//* -----------------------------Iteración #3: Mix Fors----------------------------------------------

//! Dado el siguiente javascript usa forof y forin para saber cuantas veces ha sido cada sonido agregado por los usuarios a favorito. 
//! Para ello recorre la lista de usuarios y usa forin para recoger el nombre de los sonidos que el usuario tenga como favoritos.
//! Una vez accedas a ellos piensa en la mejor forma de hacer un conteo de cada vez que ese sonido se repita como favorito en cada usuario.

//! Este ejercicio es un poco complicado con los conocimientos actuales pero...a la vez un buen reto y oportunidad para comprender que hay muchas formas de hacer las cosas en javascript.


const users2 = [
  {
    name: "Manolo el del bombo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 50 },
      rain: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "Mortadelo",
    favoritesSounds: {
      waves: { format: "mp3", volume: 30 },
      shower: { format: "ogg", volume: 55 },
      train: { format: "mp3", volume: 60 },
    },
  },
  {
    name: "Super Lopez",
    favoritesSounds: {
      shower: { format: "mp3", volume: 50 },
      train: { format: "ogg", volume: 60 },
      firecamp: { format: "mp3", volume: 80 },
    },
  },
  {
    name: "El culebra",
    favoritesSounds: {
      waves: { format: "mp3", volume: 67 },
      wind: { format: "ogg", volume: 35 },
      firecamp: { format: "mp3", volume: 60 },
    },
  },
];

const favSound = []

for (let i=0; i < users2.length; i++){
for()
}



// Dado el siguiente javascript usa forof y forin para saber cuantas veces ha sido cada sonido agregado por los usuarios a favorito. 
//! Para ello recorre la lista de usuarios y usa forin para recoger el nombre de los sonidos que el usuario tenga como favoritos.
//! Una vez accedas a ellos piensa en la mejor forma de hacer un conteo de cada vez que ese sonido se repita como favorito en cada usuario.


//*------------------------------------------Iteración #4: Métodos findArrayIndex----------------------------------------------------

//! Crea una función llamada `findArrayIndex` que reciba como parametros un array de textos y un texto y devuelve la posición del array cuando el valor del array sea igual al valor del 
//! texto que enviaste como parametro. Haz varios ejemplos y compruebalos.

//! Sugerencia de función:


function findArrayIndex(array, text) {}
```

Ej array:

```jsx
["Caracol", "Mosquito", "Salamandra", "Ajolote"];
```