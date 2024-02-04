//? --- para saber si el email se ha enviado o no, hacemos un test. Si hay un error significa que no se ha enviado ---
//* --- hacemos un estado para guardar este test, este test se va a hacer en el UTILS, quien recibe el test es el CONTROLADOR ---

// --- creamos una variable ---
let testEmailSend = false;
//!! importante siempre que se consuma el estado tenemos que volver en el controlador al final a su estado incial

// --- y hacemos una función de set ---
const setTestEmailSend = (data) => {
  // recibimos una data y lo metemos dentro del estado. Vamos a recibir un boolean.
  testEmailSend = data;
};

// --- y una función de get ---
const getTestEmailSend = () => {
  // retorna el estado del testEmailSend, como se encuentra el estado actualmnte
  return testEmailSend;
};

// --- exportamos las dos funciones, la variable NO se exporta --- ahora vamos ha hacer el útil que envía el correo
module.exports = { setTestEmailSend, getTestEmailSend };
