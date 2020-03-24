const DB = require("../../config/database");
const select_sql_builder = require("../helpers/select_sql_builder");

async function get_cash_journals(req, res) {
  const query = select_sql_builder("cash_journals", ["id"]);

  const cash_journals = await DB.queryAsync(query);

  return cash_journals;
}

module.exports = get_cash_journals;
