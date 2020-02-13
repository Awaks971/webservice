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
    discount_counts,
    basket_median,
    canceled_lines,
    profit_amount,
    profit_rate,
    articles_count,
    receipts_count
  } = cash_journals;

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
            discount_counts,
            basket_median,
            canceled_lines,
            profit_amount,
            profit_rate,
            articles_count,
            receipts_count
          ) 
      VALUES 
          (
            "${id}",
            "${store_id}",
            "${company_id}",
            "${date}",
            "${amount_ttc}",
            "${amount_ht}",
            "${discount_counts}",
            "${basket_median}",
            "${canceled_lines}",
            "${profit_amount}",
            "${profit_rate}",
            "${articles_count}",
            "${receipts_count}"
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
