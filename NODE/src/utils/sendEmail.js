const dotenv = require("dotenv"); // necesito el dotenv pq me tengo que traer el email y el password
dotenv.config();
const nodemailer = require("nodemailer");
const { setTestEmailSend } = require("../state/state.data"); // nos traemos el seteo del estado

const sendEmail = (userEmail, name, confirmationCode) => {
  // los estados funcionales como este caso se actualizan y se resetean, se utilizan y se resetean, se actualizan y se resetean
  setTestEmailSend(false); // reseteo el estado a false ---> es el estado inicial
  const email = process.env.EMAIL; // traemos el email y el password
  const password = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    // creamos las opciones del email
    from: email,
    to: userEmail,
    subject: "Confirmation code",
    text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      // en la parte del error es donde vamos a setear la parte del test
      console.log(error);
      setTestEmailSend(false); // si hay un error le decimos que no hemos enviado la parte del email
      return; // es como un else, si no se ejecuta lo de arriba, se ejecuta lo de abajo
    }
    console.log("Email sent: " + info.response);
    setTestEmailSend(true); // si no hay errores, hemos enviado el email
  });
};

// y la exportamos
module.exports = sendEmail;
