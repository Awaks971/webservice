const DB = require("../../config/database");
const send_lock_account_log = require("../../mails/handlers/lock_account");

async function lock_user_handler(req, res) {
  const { user } = req.body;

  try {
    await send_lock_account_log({ user });
    return res.status(200).json({ message: "User bloqué" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = lock_user_handler;
