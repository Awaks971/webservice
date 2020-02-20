const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_payment_journals(req, res, next) {
  const { payload: payment_journal } = req.body;
  const [SQL, payment_journal] = insert_sql_builder(
    payment_journal,
    "payment_journal"
  );

  try {
    await DB.queryAsync(SQL, [payment_journal]);
    return res
      .status(200)
      .json({ message: "Payment journals filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_payment_journals;
