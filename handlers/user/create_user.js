const DB = require("../../config/database");
const send_welcome = require("../../mails/handlers/welcome");
const send_admin_validation = require("../../mails/handlers/admin_validation");
const bcrypt = require("bcryptjs");
const uuid = require("uuid/v4");

async function create_user_handler({ user }) {
  const {
    email,
    role = "client",
    company_id,
    status = "waiting",
    company_name
  } = user;

  if (!email) {
    return res.status(409).json({
      message: "Cannot create user without email",
      error_code: "EMPTY_EMAIL"
    });
  }

  // Retrieve user to avoid duplicata
  const [potential_user] = await DB.queryAsync(
    `SELECT id, email FROM user WHERE email="${email}"`
  );

  if (potential_user && potential_user.email === email) {
    return res.status(409).json({
      message: "A user already exist with this email",
      error_code: "EMAIL_ALREADY_EXIST"
    });
  }

  try {
    // Create date for created & updated fields
    const today = new Date().toLocaleDateString();

    const user_id = uuid();
    // Create the user with waiting stauts and client role by default
    await DB.queryAsync(`
    INSERT INTO user
        (id, email, created_at, updated_at, role, company_id, status)  
    VALUES 
        ("${user_id}","${email}", "${today}","${today}", "${role}", "${company_id}", "${status}")    
    `);

    // Send a welcome email when user is created
    await send_admin_validation({
      company_name: company_name,
      email: email
    });
    await send_welcome({
      name: company_name,
      email: email
    });

    return {
      message: "User successfully created"
    };
  } catch (err) {
    return res.status(500).json({ message: err, error_code: "SQL_ERROR" });
  }
}

module.exports = create_user_handler;
