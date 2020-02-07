const DB = require("../../config/database");

async function create_tax_documents_head(req, res, next) {
  const { payload: tax_documents_head } = req.body;

  const sanitizeDocuments = sanitizeTaxDocument(tax_documents_head);
  const taxKeys = sanitizeDocuments.map(value => Object.keys(value))[0];
  const taxValues = sanitizeDocuments.map(value => Object.values(value));

  const SQLQuery = `
    INSERT INTO receipt_head (${displayTaxKeys(taxKeys)}) VALUES ?
    `;

  try {
    await DB.queryAsync(SQLQuery, [taxValues]);
    return res
      .status(200)
      .json({ message: "Tax documents head filled successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/**
 * Display each keys to make a INSERT query
 */
function displayTaxKeys(keys) {
  let query = "";
  keys.map((key, index) => {
    if (index === keys.length - 1) {
      query += key;
    } else {
      query += `${key},`;
    }
  });

  return query;
}

/**
 * The data who come from the TPV is not clear
 * So I decide to change keys name
 * with something that's easy to read (and not in french)
 */
function sanitizeTaxDocument(array) {
  return array.map(
    ({
      uuid_journal_caisse: cash_journal_id,
      uuid_document_fiscale: tax_document_id,
      Numero: tax_document_code,
      DateHeure: date,
      Echeance: dead_line,
      TotalHT: total_ht,
      TotalTtc: total_ttc,
      TotalTva: total_tva,
      TauxFrais: rate_fees,
      TotalFrais: total_fees,
      TotalRevient: profit,
      TotalOMR: omr_tax_price,
      TotalSS: ss_tax_price,
      EstAvoir: is_credit,
      NbLigne: lines_count,
      NbArticle: articles_count,
      Totalreg: paid_price,
      uuid_Client: client_id,
      Tannul: canceled_articles,
      PRemise: discount_rate,
      NomUtilisateur: employe_code,
      uuid_magasin: company_id
    }) => ({
      cash_journal_id,
      tax_document_id,
      tax_document_code,
      date,
      dead_line,
      total_ht,
      total_ttc,
      total_tva,
      rate_fees,
      total_fees,
      profit,
      omr_tax_price,
      ss_tax_price,
      is_credit,
      lines_count,
      articles_count,
      paid_price,
      client_id,
      canceled_articles,
      discount_rate,
      employe_code,
      company_id
    })
  );
}

module.exports = create_tax_documents_head;
