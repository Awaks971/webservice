const DB = require("../../config/database");

async function create_tax_documents_head(req, res, next) {
  const { payload: tax_documents_head } = req.body;

  const taxKeys = tax_documents_head.map(value => Object.keys(value))[0];
  const taxValues = tax_documents_head.map(value => Object.values(value));

  const SQLQuery = `
    INSERT INTO receipt_head (${displayTaxKeys(taxKeys)}) VALUES ?
    `;

  try {
    await DB.queryAsync(SQLQuery, [taxValues]);
    return res
      .status(200)
      .json({ message: "Receipt head filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

/**
 * Display each keys to make a INSERT query
 */
function displayTaxKeys(keys) {
  let query = "";
  keys.map((key, index) => {
    if (index === keys.length - 1) {
      query += key;
    } else {
      query += `${key},`;
    }
  });

  return query;
}

module.exports = create_tax_documents_head;
