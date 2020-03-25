/**
 * Display each keys to make a INSERT INTO query
 */
function update_sql_builder(array, table) {
  let wrapped_array = array;

  if (!Array.isArray(wrapped_array)) {
    wrapped_array = [wrapped_array];
  }

  const keys = wrapped_array.map(value => Object.keys(value))[0];
  const values = wrapped_array.map(value => Object.values(value));

  let displayed_keys = "";
  let displayed_duplicate_keys = "";
  keys.map((key, index) => {
    if (index === keys.length - 1) {
      displayed_keys += key;
      displayed_duplicate_keys += `${key}=VALUES(${key})`;
    } else {
      displayed_keys += `${key},`;
      displayed_duplicate_keys += `${key}=VALUES(${key}),`;
    }
  });

  const SQL = `
    INSERT INTO ${table} (${displayed_keys}) VALUES ? ON DUPLICATE KEY UPDATE ${displayed_duplicate_keys}
  `;

  return [SQL, values];
}

module.exports = update_sql_builder;
