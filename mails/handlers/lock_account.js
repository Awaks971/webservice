const send_email = require("../transporter");

async function lock_account({ user }) {
  console.log("Sending email...");
  await send_email({
    to: "dev@awaks.fr",
    subject: "Un utilisateur a été bloqué",
    template: "lock_account_log.pug",
    email_data: {
      user: user
    },
    attachments: []
  });
  console.log("Email sended !");
  console.log("=============================");
  console.log("Sending email...");
  await send_email({
    to: user.email,
    subject: "Votre compte a été bloqué",
    template: "lock_account.pug",
    attachments: []
  });
  console.log("Email sended !");
}

module.exports = lock_account;
