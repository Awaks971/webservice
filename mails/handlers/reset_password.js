const send_email = require("../transporter");

async function reset_password({ email, token }) {
  console.log("Sending email...");
  await send_email({
    to: "nicolas.leroy971@gmail.com",
    subject: "Réinitialisation du mot de passe",
    template: "reset_password.pug",
    email_data: {
      token: token
    }
  });
  console.log("Email sended !");
}

module.exports = reset_password;
