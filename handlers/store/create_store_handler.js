const DB = require("../../config/database");

async function create_store_handler(req, res, next) {
  const { payload: create_store } = req.body;

  const {
    id,
    name,
    siret,
    address,
    postal_code,
    city,
    country,
    phone,
    email,
    company_id
  } = create_store;

  try {
    // Create the company
    await DB.queryAsync(`
      INSERT INTO store
          (id, name, siret, phone, postal_code, city, country, address, email, company_id)  
      VALUES 
          ("${id}","${name}","${siret}","${phone}", "${postal_code}","${city}","${country}","${address}", "${email}", "${company_id}")    
    `);

    return res
      .status(200)
      .json({ message: "Store created successfully", store_id: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_store_handler;
