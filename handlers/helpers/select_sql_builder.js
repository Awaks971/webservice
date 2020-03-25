function select_sql_builder(table, selection, conditions) {
  const possible_conditions = {
    by_company: company_id => `company_id="${company_id}"`,
    by_store: store_id => `store_id="${store_id}"`,
    by_id: id => `id="${id}"`,
    by_range: ({ start, end }) =>
      `(${table}.date BETWEEN TIMESTAMP("${start}") AND TIMESTAMP("${end}"))`
  };

  let current_selection = "";
  for (let index = 0; index < selection.length; index++) {
    const element = selection[index];
    if (index === selection.length - 1) {
      current_selection += element;
    } else {
      current_selection += `${element}, `;
    }
  }
  let current_condition = "";
  for (let index = 0; index < conditions.length; index++) {
    const condition_key = Object.keys(conditions[index])[0];
    const condition_value = Object.values(conditions[index])[0];

    const current_element = possible_conditions[condition_key](condition_value);

    if (index === 0) {
      current_condition += `WHERE ${current_element}`;
    } else {
      current_condition += ` AND ${current_element}`;
    }
  }

  const query = `SELECT ${current_selection} FROM ${table} ${current_condition}`;

  return query;
}

module.exports = select_sql_builder;
