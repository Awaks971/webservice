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

  try {
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
      status: "waiting"
    };

    const { error_code, message } = await create_user_handler({
      user: default_user
    });

    if (error_code) {
      return res.status(500).json({ message, error_code });
    }

    return res
      .status(200)
      .json({ message: "Company created successfully", company_id: id });
  } catch (err) {
    console.log("company", err);

    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_company_handler;
