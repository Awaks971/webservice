const DB = require("../../config/database");
const send_welcome = require("../../mails/handlers/welcome");
const bcrypt = require("bcryptjs");

async function create_user_handler(req, res) {
  const { payload: create_user, uuid_societe: userId } = req.body;
  const {
    Prenom: firstname,
    Nom: lastname,
    Adresse: address,
    CodePostal: postalCode,
    Ville: city,
    Pays: country,
    Telephone: phone,
    Email: email,
    DateNaissance: birthdate
  } = create_user;

  if (!email) {
    res.status(400).json({
      message: "Cannot create a user without an email",
      error_code: "EMPTY_EMAIL"
    });
  }

  // Retrieve user to avoid duplicata
  const [potential_user] = await DB.queryAsync(
    `SELECT id, email FROM user WHERE id="${userId}"`
  );

  if (potential_user && potential_user.email === email) {
    res.status(409).json({
      message: `This email already exist for a user in the database --> ${email}`,
      error_code: "USER_ALREADY_EXIST"
    });
    return;
  }

  // If we got a user with this ID, return
  if (potential_user && potential_user.id) {
    res.status(409).json({
      message: `Already has this user in database. You have to patch the user instead. userId --> ${potential_user.id}`,
      error_code: "USER_ALREADY_EXIST"
    });
    return;
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

    // Create the user
    await DB.queryAsync(`
    INSERT INTO user
        (id, firstname, lastname, email, created_at, updated_at, crypted_password, role)  
    VALUES 
        ("${userId}","${firstname}","${lastname}","${email}", "${today}","${today}", "${crypted_password}", "client")    
    `);

    // Send a welcome email when user is created
    await send_welcome({
      name: firstname,
      email: email,
      uncrypted_password: uncrypted_password
    });

    // Return success message
    return res.status(200).json({
      message: "User created successfully",
      userId: userId
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, error_code: "OOPS" });
  }
}

module.exports = create_user_handler;
