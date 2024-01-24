//! 1.1 Usa querySelector para mostrar por consola el botón con la clase .**showme**

const botonShowMe = document.querySelector(".showme");
console.log(botonShowMe);

//! 1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado

const h1PorQuery = document.querySelector("#pillado");
console.log(h1PorQuery);

//! 1.3 Usa querySelector para mostrar por consola todos los p

const todosP = document.querySelectorAll("p");
console.log(todosP);

//! 1.4 Usa querySelector para mostrar por consola todos los elementos con la clase.pokemon

const elementosPokemos = document.querySelectorAll(".pokemon");
console.log(elementosPokemos);

//! 1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo data-function="testMe".

const allDataFunction = document.querySelectorAll("[data-function='testMe']");
console.log(allDataFunction);

//! 1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo data-function="testMe".

console.log(thirdElement);
