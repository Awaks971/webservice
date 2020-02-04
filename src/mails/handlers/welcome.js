import send_email from "../transporter";

async function send_welcome({ email, firstname, uncrypted_password }) {
  await send_email({
    to: email,
    subject: "Bienvenue sur le dashboard d'Awaks",
    template: "welcome.pug",
    email_data: {
      name: firstname,
      email: email,
      password: uncrypted_password
    },
    attachments: [
      {
        filename: "dashboard_screenshot.png",
        path: `./src/mails/static/dashboard_screenshot.png`,
        cid: "@dashboard_screenshot",
        contentTransferEncoding: "base64"
      }
      // {
      //   filename: "eye.svg",
      //   path: `./src/mails/static/eye.svg`,
      //   cid: "@eye",
      //   contentTransferEncoding: "base64"
      // },
      // {
      //   filename: "lock.svg",
      //   path: `./src/mails/static/lock.svg`,
      //   cid: "@lock",
      //   contentTransferEncoding: "base64"
      // },
      // {
      //   filename: "send.svg",
      //   path: `./src/mails/static/send.svg`,
      //   cid: "@send",
      //   contentTransferEncoding: "base64"
      // }
    ]
  });
}

export default send_welcome;
