const DB = require("../../config/database");

const user_status = {
  VALIDATED: "validated",
  WAITING: "waiting",
  LOCKED: "locked"
};

async function user_verification(req, res) {
  const { company_id } = req.body;
  const [potential_company] = await DB.queryAsync(
    `SELECT id FROM company WHERE id="${company_id}"`
  );

  if (!potential_company || !potential_company.id) {
    return res.status(404).json({
      message: "No company found for this id",
      error_code: "COMPANY_NOT_FOUND"
    });
  }

  const [potential_user] = await DB.queryAsync(
    `SELECT id, status FROM user WHERE company_id="${company_id}"`
  );

  if (!potential_user || !potential_user.id) {
    return res.status(404).json({
      message: "No user for this company",
      error_code: "USER_NOT_FOUND"
    });
  }
  if (potential_user.status === user_status.WAITING) {
    return res.status(403).json({
      message:
        "This user is waiting for an admin validation, please contact awaks support",
      error_code: "USER_WAITING_FOR_VALIDATION"
    });
  }
  if (potential_user.status === user_status.LOCKED) {
    return res.status(403).json({
      message:
        "This user account is is locked by awaks, please contact awaks support",
      error_code: "LOCKED_USER"
    });
  }

  return res.status(200).json({
    message: "Known user, feel free to store your data :)",
    error_code: null
  });
}

module.exports = user_verification;
