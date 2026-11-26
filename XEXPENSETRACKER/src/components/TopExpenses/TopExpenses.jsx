import React from "react";
import "./TopExpenses.css";

const CATEGORY_COLORS = {
  Food: "#8983D5",
  Travel: "#8983D5",
  Entertainment: "#8983D5",
  Others: "#8983D5",
};

const TopExpenses = ({ transactions }) => {
  // Calculate total spending for each category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category;

    acc[category] = (acc[category] || 0) + transaction.amount;

    return acc;
  }, {});

  // Sort categories by spending amount and show top 3
  const expenses = Object.entries(categoryTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      color: CATEGORY_COLORS[name] || "#8983D5",
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const maxAmount = expenses.length
    ? Math.max(...expenses.map((expense) => expense.amount))
    : 0;

  return (
    <section className="top-expenses">
      <h2>Top Expenses</h2>

      <div className="expenses-card">
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses yet</p>
        ) : (
          expenses.map((expense) => (
            <div className="expense-bar-row" key={expense.name}>
              <span className="expense-label">{expense.name}</span>

              <div className="expense-bar-track">
                <div
                  className="expense-bar"
                  style={{
                    width: `${(expense.amount / maxAmount) * 100}%`,
                    backgroundColor: expense.color,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TopExpenses;