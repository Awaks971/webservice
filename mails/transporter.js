const transport = require("nodemailer-promise");
const pug = require("pug");

const { AWAKS_GMAIL_USER } = process.env;

async function send_email({
  to,
  subject,
  template,
  email_data = {},
  attachments = []
}) {
  /**
   * Create the mail transporter
   */
  const transporter = transport.config({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: AWAKS_GMAIL_USER,
      clientId:
        "367024695696-4njm7e0quidlcuh7upv7evucgsf7u7rr.apps.googleusercontent.com",
      clientSecret: "1nZvC3tWKy_P24DapUqaOhey",
      refreshToken:
        "1//04QndZ0etKni7CgYIARAAGAQSNwF-L9IrWrdK3Cz5RRhHeuqbW8m4mVMF_e9IbdeEh_yTKHJUGBwuukiFsIHRyuGXVUNKhU8WI88",
      accessToken:
        "ya29.Il-7B8Uk1GGz95sG-L0_ZzXlUkTYOvS7noYFsa63uZ3OtkA29GAISuUuQB1N_bBW9c6dLXyEcaoojEjSa8wKIXdaGwZOmRwhlbWsb9pcAY2aNx1Zi_zef6btDZYp3mepBg",
      expires: 1484314697598
    }
  });

  /**
   * Apply some email options
   */
  const mailOptions = {
    from: AWAKS_GMAIL_USER,
    to: to,
    subject: subject, // Subject line
    html: pug.renderFile(`${__dirname}/templates/${template}`, {
      ...email_data
    }),
    attachments: [
      {
        filename: "awaks_banner.png",
        path: `${__dirname}/static/awaks_banner.png`,
        cid: "@awaks_banner"
      },
      {
        filename: "awaks_footer.png",
        path: `${__dirname}/static/awaks_footer.png`,
        cid: "@awaks_footer"
      }
    ].concat(attachments)
  };

  /**
   * Return a promise with sended email informations
   */
  try {
    console.log(to);
    const result = await transporter(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = send_email;
