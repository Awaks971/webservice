function select_sql_builder(table, selection, condition) {
  const possible_conditions = {
    by_company: company_id => `company_id="${company_id}"`,
    by_store: store_id => `store_id="${store_id}"`,
    by_id: id => `id="${id}"`,
    by_range: range =>
      `date BETWEEN "${range.range.start}" AND "${range.range.end}"`
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
  for (let index = 0; index < condition.length; index++) {
    const condition_key = condition ? Object.keys(condition[index])[0] : null;
    const condition_value = condition
      ? Object.values(condition[index])[0]
      : null;
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
