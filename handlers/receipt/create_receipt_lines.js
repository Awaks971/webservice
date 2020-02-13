const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_tax_document_lines(req, res, next) {
  const { payload: tax_document_lines } = req.body;
  const [SQL, lines] = insert_sql_builder(tax_document_lines, "receipt_line");

  try {
    await DB.queryAsync(SQL, [lines]);
    return res
      .status(200)
      .json({ message: "Receipt lines filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_tax_document_lines;
