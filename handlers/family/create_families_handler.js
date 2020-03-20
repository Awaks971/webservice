const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_families(req, res, next) {
  const { payload: families } = req.body;
  const [SQL, families_payload] = insert_sql_builder(families, "families");

  try {
    await DB.queryAsync(SQL, [families_payload]);
    return res.status(200).json({ message: "families filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_families;
