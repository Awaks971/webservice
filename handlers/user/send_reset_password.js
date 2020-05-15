const DB = require("../../config/database");
const uuid = require("uuid/v4");
const jwt = require("jsonwebtoken");
const reset_password_mailer = require("../../mails/handlers/send_reset_password");
const { AWAKS_JWT_SECRET_KEY } = process.env;

async function send_reset_password_email(req, res) {
  const { email } = req.body;

  const [potential_user] = await DB.queryAsync(
    `SELECT id FROM user WHERE email="${email}"`
  );

  if (!potential_user) {
    return res
      .status(404)
      .json({ message: `Pas d'utilisateur pour cet email: ${email}` });
  } else {
    const { email } = req.body;
    const token_id = uuid();
    const token = jwt.sign({ email, token_id }, AWAKS_JWT_SECRET_KEY, {
      expiresIn: 900
    });
    const { exp } = jwt.decode(token);
    const validity = (exp * 1000).toString();

    await DB.queryAsync(`
      INSERT INTO tokens (
          val,
          id,
          validity
      )
      VALUES (
          "${token}",
          "${token_id}",
          "${validity}"
      )
    `);

    await reset_password_mailer({ email, token });

    return res.status(200).json({ message: `Email envoyé à ${email}` });
  }
}

module.exports = send_reset_password_email;
