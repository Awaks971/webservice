const DB = require("../../config/database");

async function create_company_handler(req, res, next) {
  const {
    raisonSociale: name,
    NuméroSiret: siret,
    uuid_Personne: userId,
    uuid_societe: companyId,
    Telephone: phone,
    CodePostal: postalCode,
    Ville: city,
    Pays: country,
    Adresse: address,
    Email: email
  } = req.body;

  // Retrieve user who wanted to create a company
  const owner = await getCompanyOwner({ userId });

  // Verify if user exist in database
  if (!owner.id) {
    res.status(404).send("Owner not found");
    return;
  }

  // Create the company
  const created_company = await DB.queryAsync(`
    INSERT INTO company
        (id, name, siret, owner, phone, postalCode, city, country, address, email)  
    VALUES 
        ("${companyId}","${name}","${siret}","${owner.id}","${phone}", "${postalCode}","${city}","${country}","${address}", "${email}")    
  `);

  return created_company;
}

async function getCompanyOwner({ userId }) {
  // Retrieve user by ID
  const [owner] = await DB.queryAsync(`SELECT INTO users WHERE id=${userId}`);

  // Throw error if no user found
  if (!owner.id) throw new Error("User not found");

  return owner;
}

module.exports = create_company_handler;
