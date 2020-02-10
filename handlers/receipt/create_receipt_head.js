const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_tax_documents_head(req, res, next) {
  const { payload: tax_documents_head } = req.body;
  const [SQL, head] = insert_sql_builder(tax_documents_head);

  try {
    await DB.queryAsync(SQL, [head]);
    return res
      .status(200)
      .json({ message: "Receipt head filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_tax_documents_head;
