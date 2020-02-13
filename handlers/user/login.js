const DB = require("../../config/database");
const bcrypt = require("bcryptjs");

async function login(req, res, next) {
  const { credentials } = req.body;

  const [user] = await DB.queryAsync(
    `SELECT id, company_id, crypted_password FROM user WHERE email="${credentials.email}";`
  );

  //   // Verify if user exist
  if (user === undefined) {
    return res.status(401).json({
      message: `No user found with this email: ${credentials.email}`,
      error_code: "USER_NOT_FOUND"
    });
  }
  //   // Verify his password
  const passwordIsValid = await bcrypt.compare(
    credentials.password,
    user.crypted_password
  );
  if (!passwordIsValid) {
    return res.status(403).json({
      message: `Bad password`,
      error_code: "BAD_PASSWORD"
    });
  }

  // Delete crypted password from database
  delete user.crypted_password;

  // Get all user companies
  const companies = await DB.queryAsync(
    `SELECT * FROM company WHERE id="${user.company_id}";`
  );

  // Get all user stores
  const stores = await DB.queryAsync(
    `SELECT * FROM store WHERE company_id="${user.company_id}";`
  );

  // Push companies and stores into user object response.
  user.companies = companies;
  user.stores = stores;

  console.log(user);
  res.json(user);
  next();
}

module.exports = login;
