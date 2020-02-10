/**
 * Display each keys to make a INSERT INTO query
 */
function insert_sql_builder(array) {
  const keys = array.map(value => Object.keys(value))[0];
  const values = array.map(value => Object.values(value));

  let displayed_keys = "";
  keys.map((key, index) => {
    if (index === keys.length - 1) {
      displayed_keys += key;
    } else {
      displayed_keys += `${key},`;
    }
  });

  const SQL = `
    INSERT INTO receipt_line (${displayed_keys}) VALUES ?
  `;

  return [SQL, values];
}
