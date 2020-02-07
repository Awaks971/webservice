const DB = require("../../config/database");

async function create_company_handler(req, res, next) {
  const { payload: create_company, uuid_societe: userId } = req.body;

  const {
    raisonSociale: name,
    NumeroSiret: siret,
    uuid_magasin: companyId,
    Telephone: phone,
    CodePostal: postal_code,
    Ville: city,
    Pays: country,
    Adresse: address,
    Email: email
  } = create_company;

  // Retrieve user who wanted to create a company
  const owner = await getCompanyOwner({ userId });

  if (!owner || !owner.id) {
    res
      .status(404)
      .json({ message: "Unknown user", error_code: "USER_NOT_FOUND" });
    return;
  }
  try {
    // Create the company
    await DB.queryAsync(`
      INSERT INTO company
          (id, name, siret, owner, phone, postal_code, city, country, address, email)  
      VALUES 
          ("${companyId}","${name}","${siret}","${owner.id}","${phone}", "${postal_code}","${city}","${country}","${address}", "${email}")    
    `);

    return res
      .status(200)
      .json({ message: "Company created successfully", companyId });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "BAD_RESPONSE" });
  }
}

async function getCompanyOwner({ userId }) {
  // Retrieve user by ID
  const [owner] = await DB.queryAsync(
    `SELECT id FROM user WHERE id="${userId}"`
  );
  return owner;
}

module.exports = create_company_handler;
