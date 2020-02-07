const DB = require("../../config/database");
const send_welcome = require("../../mails/handlers/welcome");
const bcrypt = require("bcryptjs");
const uuid = require("uuid/v4");

async function create_user_handler({ user }) {
  const { email, role = "client", company_id, status = "waiting" } = user;

  if (!email) {
    throw new Error({
      message: "Cannot create user without email",
      error_code: "EMPTY_EMAIL"
    });
  }

  // Retrieve user to avoid duplicata
  const [potential_user] = await DB.queryAsync(
    `SELECT id, email FROM user WHERE email="${email}"`
  );

  if (potential_user && potential_user.email === email) {
    throw new Error({
      message: "A user already exist with this email",
      error_code: "EMAIL_ALREADY_EXIST"
    });
  }

  try {
    // Create date for created & updated fields
    const today = new Date().toLocaleDateString();

    // Generate a random password for the user
    const uncrypted_password = Math.random()
      .toString(26)
      .slice(2);
    // Crypt the password to store it in database
    const crypted_password = await bcrypt.hash(uncrypted_password, 10);
    const user_id = uuid();
    // Create the user with waiting stauts and client role by default
    await DB.queryAsync(`
    INSERT INTO user
        (id, email, created_at, updated_at, crypted_password, role, company_id, status)  
    VALUES 
        ("${user_id}","${email}", "${today}","${today}", "${crypted_password}", "${role}", "${company_id}", "${status}")    
    `);

    // Send a welcome email when user is created
    await send_welcome({
      email: email,
      uncrypted_password: uncrypted_password
    });

    return {
      message: "User successfully created",
      error_code: null
    };
  } catch (err) {
    console.log("user", err);
    throw new Error({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_user_handler;
