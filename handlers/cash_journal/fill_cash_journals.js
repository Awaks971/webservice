const DB = require("../../config/database");

async function fill_cash_journals_handler(req, res) {
  const { payload: cash_journals } = req.body;
  const {
    id,
    store_id,
    company_id,
    date,
    amount_ttc,
    amount_ht,
    discount_count,
    basket_median,
    canceled_lines,
    profit_amount,
    profit_rate,
    article_count,
    receipt_count
  } = cash_journals;

  const clean_date = typeof date === "string" ? new Date(date).getTime() : date;

  try {
    await DB.queryAsync(`
      INSERT INTO cash_journal 
          (
            id,
            store_id,
            company_id,
            date,
            amount_ttc,
            amount_ht,
            discount_count,
            basket_median,
            canceled_lines,
            profit_amount,
            profit_rate,
            article_count,
            receipt_count
          ) 
      VALUES 
          (
            "${id}",
            "${store_id}",
            "${company_id}",
            ${clean_date},
            "${amount_ttc}",
            "${amount_ht}",
            "${discount_count}",
            "${basket_median}",
            "${canceled_lines}",
            "${profit_amount}",
            "${profit_rate}",
            "${article_count}",
            "${receipt_count}"
          )
    `);

    return res
      .status(200)
      .json({ message: "Cash journal filled successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message, error_code: "SQL_ERROR" });
  }
}

module.exports = fill_cash_journals_handler;
