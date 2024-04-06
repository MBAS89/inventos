const Expenses = require("../../models/expenses/expenses");
const ExpensesTypes = require("../../models/expenses/expensesType");

Expenses.belongsTo(ExpensesTypes, { foreignKey: 'expenses_type_id' });
ExpensesTypes.hasMany(Expenses, { foreignKey: 'expenses_type_id' });

// Export models
module.exports = {
    Expenses,
    ExpensesTypes
};
