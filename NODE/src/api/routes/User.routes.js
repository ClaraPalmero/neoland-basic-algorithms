//! --------- importamos ----------
const { upload } = require("../../middleware/files.middleware");
const { registerLargo } = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

//! configuramos
UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
module.exports = UserRoutes; // quien consume las rutas es el index, lo exportamos
