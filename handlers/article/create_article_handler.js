const DB = require("../../config/database");
const insert_sql_builder = require("../helpers/insert_sql_builder");

async function create_articles(req, res, next) {
  const { payload: articles } = req.body;
  const [SQL, articles_payload] = insert_sql_builder(articles, "articles");

  try {
    await DB.queryAsync(SQL, [articles_payload]);
    return res.status(200).json({ message: "Articles filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = create_articles;
