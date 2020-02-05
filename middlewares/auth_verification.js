const DB = require("../config/database");

async function user_verification_middleware(req, res, next) {
  const { uuid_magasin: companyId } = req.body;
  const [potential_company] = await DB.queryAsync(
    `SELECT id, status, owner FROM company WHERE id="${companyId}"`
  );
  if (!potential_company || !potential_company.id) {
    res
      .status(401)
      .json({ message: "Unknown company", error_code: "COMPANY_NOT_FOUND" });
    res.end();
    return;
  }

  const [potential_user] = await DB.queryAsync(
    `SELECT id, status FROM users WHERE id="${potential_company.owner}"`
  );
  if (!potential_user || !potential_user.id) {
    res
      .status(401)
      .json({ message: "Unknown user", error_code: "USER_NOT_FOUND" });
    res.end();
    return;
  }
  if (potential_user.status === "WAITING") {
    res.status(403).json({
      message:
        "This user is waiting for an admin validation, please contact awaks support",
      error_code: "USER_WAITING_FOR_VALIDATION"
    });
    res.end();
    return;
  }
  if (potential_user.status === "LOCKED") {
    res.status(403).json({
      message:
        "This user account is is locked by awaks, please contact awaks support",
      error_code: "LOCKED_USER"
    });
    res.end();
    return;
  }

  next();
}

async function technician_verification_middleware(req, res, next) {
  const { uuid_Technicien: technicianId } = req.body;
  const [potential_technician] = await DB.queryAsync(
    `SELECT id FROM technician WHERE id="${technicianId}"`
  );
  if (!potential_technician.id) {
    res.status(401).json({ message: "Unknown technician" });
    res.end();
  }
  next();
}

module.exports = {
  technician_verification_middleware,
  user_verification_middleware
};
