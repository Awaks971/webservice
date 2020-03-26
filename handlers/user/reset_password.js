const DB = require("../../config/database");
const uuid = require("uuid/v4");
const jwt = require("jsonwebtoken");
const reset_password_mailer = require("../../mails/handlers/reset_password");
const { AWAKS_JWT_SECRET_KEY } = process.env;

async function reset_password(req, res) {
  const { email } = req.body;
  const token = jwt.sign({}, AWAKS_JWT_SECRET_KEY, { expiresIn: 54000 });
  const { exp } = jwt.decode(token);
  const id = uuid();
  const validity = (exp * 1000).toString();

  await DB.queryAsync(`
    INSERT INTO tokens (
        val, 
        id, 
        validity
    )
    VALUES ( 
        "${token}",
        "${id}", 
        "${validity}"
    )
  `);

  await reset_password_mailer({ email, token });
}

module.exports = reset_password;
