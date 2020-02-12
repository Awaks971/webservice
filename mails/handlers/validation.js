const send_email = require("../transporter");

async function send_validation({ email, name, password }) {
  console.log(`Sending email to : ${email} ...`);
  await send_email({
    to: email,
    subject: "Bienvenue sur le dashboard d'Awaks",
    template: "validation.pug",
    email_data: {
      name: name,
      email: email,
      password: password
    },
    attachments: [
      {
        filename: "dashboard_screenshot.png",
        path: `./mails/static/dashboard_screenshot.png`,
        cid: "@dashboard_screenshot",
        contentTransferEncoding: "base64"
      }
    ]
  });
  console.log("Email sended !");
}

module.exports = send_validation;
