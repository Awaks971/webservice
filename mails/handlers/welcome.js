const send_email = require("../transporter");

async function send_welcome({ email, name }) {
  await send_email({
    to: email,
    subject: "Bienvenue sur le dashboard d'Awaks",
    template: "welcome.pug",
    email_data: {
      name: name
    },
    attachments: []
  });
}

module.exports = send_welcome;
