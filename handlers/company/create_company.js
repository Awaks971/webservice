const DB = require("../../config/database");
const create_user_handler = require("../user/create_user");

async function create_company_handler(req, res, next) {
  const { payload: create_company } = req.body;

  const {
    id,
    name,
    siret,
    address,
    postal_code,
    city,
    country,
    phone,
    email
  } = create_company;

  if (!email) {
    return res.status(400).json({
      message: "Need a email to create a default user",
      error_code: "EMPTY_EMAIL"
    });
  }

  // Retrieve user to avoid duplicata
  const [potential_company] = await DB.queryAsync(
    `SELECT id FROM company WHERE id="${id}"`
  );

  if (potential_company && potential_company.id) {
    return res.status(409).json({
      message: "A company already exist with this ID",
      error_code: "COMPANY_ALREADY_EXIST"
    });
  }

  try {
    const today = new Date().toLocaleDateString();

    // Create the company
    await DB.queryAsync(`
      INSERT INTO company
          (id, name, siret, phone, postal_code, city, country, address, email)  
      VALUES 
          ("${id}","${name}","${siret}","${phone}", "${postal_code}","${city}","${country}","${address}", "${email}")    
    `);

    const default_user = {
      email,
      company_id: id,
      role: "client",
      status: "waiting",
      company_name: name
    };

    const { error_code, message } = await create_user_handler({
      user: default_user,
      res
    });

    if (error_code) {
      return res.status(500).json({ message, error_code });
    }

    return res
      .status(200)
      .json({ message: "Company created successfully", company_id: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_company_handler;
