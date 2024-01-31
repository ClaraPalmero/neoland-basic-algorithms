//? creamos nuetro servidor web - express

//! para llamar a las variables de retorno .env

const express = require("express");
const dotenv = require("dotenv");
const { connect } = require("./src/utils/db");

// creamos el servidor web
const app = express();

// vamos a configurar dotenv para poder utilizar las variables d entorno del .env
dotenv.config(); // siempreee

//! conectamos con la base de datos
connect();
