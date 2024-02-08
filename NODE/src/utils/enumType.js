const enumType = (type) => {
  const enumType = ["Supermercado", "Hipermercado", "Otros"]; // vamos a comprobar que se encuentre en un array los generos
  if (enumType.includes(type)) {
    console.log("entro en el true");
    return { check: true, type }; // si se encuentra retornamos que se ha chequeado
  } else {
    return {
      check: false,
    };
  }
};

module.exports = enumType;
