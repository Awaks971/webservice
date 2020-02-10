const DB = require("../../config/database");

async function create_tax_document_lines(req, res, next) {
  const { payload: tax_document_lines } = req.body;

  const lineKeys = tax_document_lines.map(value => Object.keys(value))[0];
  const lineValues = tax_document_lines.map(value => Object.values(value));

  const SQLQuery = `
    INSERT INTO receipt_line (${displayTaxKeys(lineKeys)}) VALUES ?
    `;

  try {
    await DB.queryAsync(SQLQuery, [lineValues]);
    return res
      .status(200)
      .json({ message: "Receipt lines filled successfully" });
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

module.exports = create_tax_document_lines;
