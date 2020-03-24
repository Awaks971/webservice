const DB = require("../config/database");
const select_sql_builder = require("./helpers/select_sql_builder");

async function get_ressources(req, res) {
  const { payload } = req.body;

  const { table, elements, condition } = payload;
  const query = select_sql_builder(table, elements, condition);

  try {
    const ressources = await DB.queryAsync(query);

    return res.status(200).json(ressources);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = get_ressources;
