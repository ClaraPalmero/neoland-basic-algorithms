//! ------ creamos un error, esta función lo maneja ...........
const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
};
module.exports = setError;
