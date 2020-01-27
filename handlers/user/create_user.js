const DB = require("../../config/database");

async function create_user_handler(req, res, next) {
  const { create_user } = req.body;
  const {
    Prenom: firstname,
    Nom: lastname,
    Adresse: address,
    CodePostal: postalCode,
    Ville: city,
    Pays: country,
    Telephone: phone,
    Email: email,
    DateNaissance: birthdate,
    uuid_Personne: userId
  } = create_user;

  // Retrieve user to avoid duplicata
  const [potential_user] = await DB.queryAsync(
    `SELECT id FROM users WHERE id="${userId}"`
  );

  // If we got a user with this ID, return
  if (potential_user && potential_user.id) {
    res.status(409).send(`Already has this user in database. 
        You have to patch the user instead. userId --> ${potential_user.id}`);
    return;
  }

  try {
    // Create date for created & updated fields
    const today = new Date().toLocaleDateString();

    // Create the user
    await DB.queryAsync(`
    INSERT INTO users
        (id, firstname, lastname, address, postalCode, city, country, phone, email, birthdate, created_at, updated_at)  
    VALUES 
        ("${userId}","${firstname}","${lastname}","${address}","${postalCode}", "${city}","${country}","${phone}","${email}", "${birthdate}", "${today}","${today}")    
    `);

    // Return success message
    return res.status(200).json({
      message: "User created successfully",
      userId: userId
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = create_user_handler;
