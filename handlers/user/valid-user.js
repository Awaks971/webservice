const DB = require("../../config/database");
const send_validation = require("../../mails/handlers/validation");
const bcrypt = require("bcryptjs");

async function valid_user_handler(req, res) {
  const { userId, company_id } = req.body;

  try {
    const uncrypted_password = Math.random()
      .toString(26)
      .slice(2);

    // Crypt the password to store it in database
    const crypted_password = await bcrypt.hash(uncrypted_password, 10);

    await DB.queryAsync(
      `UPDATE user SET status="validated", crypted_password="${crypted_password}" WHERE id="${userId}"`
    );

    const [company] = await DB.queryAsync(
      `SELECT name FROM company WHERE id="${company_id}"`
    );

    const [user] = await DB.queryAsync(
      `SELECT email FROM user WHERE id="${userId}"`
    );

    // Send a welcome email when user is created
    const response = await send_validation({
      name: company.name,
      email: user.email,
      password: uncrypted_password
    });

    console.log(response);

    return res.status(200).json({
      message: "User successfully updated"
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = valid_user_handler;
