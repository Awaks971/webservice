const DB = require("../../config/database");

async function create_tax_document_lines(req, res, next) {
  const { tax_document_lines } = req.body;

  const sanitizeDocuments = sanitizeTaxDocument(tax_document_lines);
  const lineKeys = sanitizeDocuments.map(value => Object.keys(value))[0];
  const lineValues = sanitizeDocuments.map(value => Object.values(value));

  const SQLQuery = `
    INSERT INTO tax_document_lines (${displayTaxKeys(lineKeys)}) VALUES ?
    `;

  try {
    await DB.queryAsync(SQLQuery, [lineValues]);
    return res
      .status(200)
      .json({ message: "Tax documents lines filled successfully" });
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
      uuid_detail_document_fiscale: id,
      uuid_document_fiscale: tax_document_id,
      Lig: line_position,
      MntTva: vat_amount,
      BaseTva: vat_base,
      TLigne: lines_count,
      Designation: label,
      DesignationExtra: label_extra,
      TauxTVA: vat_rate,
      PRemise: discount_rate,
      TotalQte: articles_count,
      MntAchat: total_purchase,
      MntRemise: total_discount,
      MntHT_NET: amount_ht,
      MntTTC_NET: amount_ttc,
      Ligann: canceled_lines
    }) => ({
      id,
      tax_document_id,
      line_position,
      vat_amount,
      vat_base,
      lines_count,
      label,
      label_extra,
      vat_rate,
      discount_rate,
      articles_count,
      total_purchase,
      total_discount,
      amount_ht,
      amount_ttc,
      canceled_lines
    })
  );
}

module.exports = create_tax_document_lines;
