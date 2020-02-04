const DB = require("../../config/database");

async function create_company_handler(req, res, next) {
  const { create_company } = req.body;

  const {
    raisonSociale: name,
    NumeroSiret: siret,
    uuid_Personne: userId,
    uuid_societe: companyId,
    Telephone: phone,
    CodePostal: postalCode,
    Ville: city,
    Pays: country,
    Adresse: address,
    Email: email
  } = create_company;

  // Retrieve user who wanted to create a company
  const owner = await getCompanyOwner(res, { userId });

  // Create the company
  await DB.queryAsync(`
    INSERT INTO company
        (id, name, siret, owner, phone, postalCode, city, country, address, email)  
    VALUES 
        ("${companyId}","${name}","${siret}","${owner.id}","${phone}", "${postalCode}","${city}","${country}","${address}", "${email}")    
  `);

  res.status(200).json({ message: "Company created successfully", companyId });
}

async function getCompanyOwner(res, { userId }) {
  // Retrieve user by ID
  const [owner] = await DB.queryAsync(
    `SELECT id FROM users WHERE id="${userId}"`
  );

  // Throw error if no user found
  if (!owner.id) res.status(404).send("No user found with this ID");

  return owner;
}

module.exports = create_company_handler;
