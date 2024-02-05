const { upload } = require("../../middleware/files.middleware");
const {
  registerLargo,
  register,
  registerWithRedirect,
  sendCode,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
} = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

//! ---------------- endPoints sin auth, no hay un middleware por medio---------------------------------------
UserRoutes.get("/registerLargo", upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), register);
UserRoutes.get("/register", upload.single("image"), registerWithRedirect);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.patch("/forgotpassword", changePassword); // patch pq es una modificación parcial

/// ------------------> rutas que pueden ser redirect
UserRoutes.get("/register/sendMail/:id", sendCode); // :id ---> es el nombre del param
UserRoutes.patch("/sendPassword/:id", sendPassword); // patch pq redirect 307 no cambia el método = UserRoutes.patch("/forgotpassword", changePassword)
module.exports = UserRoutes;
