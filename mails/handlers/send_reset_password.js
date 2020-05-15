const send_email = require("../transporter");

async function send_reset_password({ email, token }) {
  console.log("Sending email...");
  await send_email({
    to: email,
    subject: "Réinitialisation du mot de passe",
    template: "reset_password.pug",
    email_data: {
      token: token
    }
  });
  console.log("Email sended !");
}

module.exports = send_reset_password;
