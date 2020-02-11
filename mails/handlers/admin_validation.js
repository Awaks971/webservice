const send_email = require("../transporter");

async function send_admin_validation({ email, company_name }) {
  console.log("Sending email...");
  await send_email({
    to: "dev@awaks.fr",
    subject: "Un nouvel utilisateur a été créé",
    template: "admin_validation.pug",
    email_data: {
      company_name: company_name,
      email: email
    },
    attachments: []
  });
  console.log("Email sended !");
}

module.exports = send_admin_validation;
