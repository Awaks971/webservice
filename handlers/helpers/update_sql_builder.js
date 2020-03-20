/**
 * Display each keys to make a INSERT INTO query
 */
function insert_sql_builder(array, table) {
  let clean_array = array;

  if (!Array.isArray(clean_array)) {
    clean_array = [clean_array];
  }

  const keys = clean_array.map(value => Object.keys(value))[0];
  const values = clean_array.map(value => Object.values(value));

  let displayed_keys = "";
  keys.map((key, index) => {
    if (index === keys.length - 1) {
      displayed_keys += key;
    } else {
      displayed_keys += `${key},`;
    }
  });

  const SQL = `
      INSERT INTO ${table} (${displayed_keys}) VALUES ?
    `;

  return [SQL, values];
}

module.exports = insert_sql_builder;
