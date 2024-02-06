//! --- hacemos un enum de género ---

const enumOk = (gender) => {
  const enumGender = ["hombre", "mujer", "otros"]; // vamos a comprobar que se encuentre en un array los generos
  if (enumGender.includes(gender)) {
    console.log("entro en el true");
    return { check: true, gender }; // si se encuentra retornamos que se ha chequeado
  } else {
    return {
      check: false,
    };
  }
};

module.exports = enumOk;
