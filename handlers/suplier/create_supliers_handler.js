const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_supliers(req, res, next) {
  const { payload: supliers } = req.body;
  const [SQL, supliers_payload] = insert_sql_builder(supliers, "supliers");

  try {
    await DB.queryAsync(SQL, [supliers_payload]);
    return res.status(200).json({ message: "supliers filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_supliers;
