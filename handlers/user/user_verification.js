const DB = require("../../config/database");

const user_status = {
  VALIDATED: "VALIDATED",
  WAITING: "WAITING",
  LOCKED: "LOCKED"
};

async function user_verification(req, res, next) {
  const { uuid_Personne: userId } = req.body;
  const [potential_user] = await DB.queryAsync(
    `SELECT id, status FROM users WHERE id="${userId}"`
  );

  console.log(potential_user);
  if (!potential_user || !potential_user.id) {
    res
      .status(401)
      .json({ message: "Unknown user", error_code: "USER_NOT_FOUND" });
    res.end();
    return;
  }
  if (potential_user.status === user_status.WAITING) {
    res.status(403).json({
      message:
        "This user is waiting for an admin validation, please contact awaks support",
      error_code: "USER_WAITING_FOR_VALIDATION"
    });
    res.end();
    return;
  }
  if (potential_user.status === user_status.LOCKED) {
    res.status(403).json({
      message:
        "This user account is is locked by awaks, please contact awaks support",
      error_code: "LOCKED_USER"
    });
    res.end();
    return;
  }

  res.status(200).json({
    message: "Known user, feel free to store your data :)",
    error_code: null
  });
}

module.exports = user_verification;
