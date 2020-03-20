const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_sellers(req, res, next) {
  const { payload: sellers } = req.body;
  const [SQL, sellers_payload] = insert_sql_builder(sellers, "sellers");

  try {
    await DB.queryAsync(SQL, [sellers_payload]);
    return res.status(200).json({ message: "sellers filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_sellers;
