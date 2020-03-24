function select_sql_builder(table, selection, condition) {
  const condition_key = condition ? Object.keys(condition)[0] : null;
  const condition_value = condition ? Object.values(condition)[0] : null;

  const possible_conditions = {
    by_company: company_id => `WHERE company_id=${company_id}`,
    by_store: store_id => `WHERE store_id=${store_id}`,
    by_id: id => `WHERE id=${id}`
  };

  let current_selection = "";
  const current_condition = condition
    ? possible_conditions[condition_key](condition_value)
    : ``;

  for (let index = 0; index < selection.length; index++) {
    const element = selection[index];
    if (index === selection.length - 1) {
      current_selection += element;
    } else {
      current_selection += `${element}, `;
    }
  }

  const query = `SELECT ${current_selection} FROM ${table} ${current_condition}`;
  return query;
}

module.exports = select_sql_builder;
