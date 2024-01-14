//* ---------------------------------Iteration#6: Búcles--------------------------------------------------

//! 1.1 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola.
//!-------------------------------------------------------------------------------------------------------------------------------------------

for (let i = 0; i <= 9; i++) {
  console.log(i);
}

//! 1.2 Crea un bucle for que vaya desde 0 a 9 y muestralo por consola solo cuando el resto del numero dividido entre 2 sea 0.
//!-------------------------------------------------------------------------------------------------------------------------------------------

for (let i1 = 0; i1 <= 9; i1++) {
  if (i1 / 2 && i1 % 2 == 0) {
    console.log(i1);
  }
}

//! 1.3 Crea un bucle para conseguir dormir contando ovejas. Este bucle tiene que dar 10 vueltas, es decir, 10 console.log.
//!Muestra por consola un mensaje diciendo 'Intentando dormir 🐑' en cada vuelta del bucle y cambia el mensaje en la décima vuelta a 'Dormido!'.
//!-------------------------------------------------------------------------------------------------------------------------------------------

for (let a = 0; a <= 10; a++) {
  if (a < 10) {
    console.log("Intentando dormir 🐑");
  } else {
    console.log("Dormido!");
  }
}
