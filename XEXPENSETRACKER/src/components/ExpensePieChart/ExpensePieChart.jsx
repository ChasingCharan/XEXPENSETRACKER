import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

const renderCustomizedLabel = ({ percent }) => {
  if (percent === 0) return "";
  return `${(percent * 100).toFixed(0)}%`;
};

const ExpensePieChart = ({ transactions }) => {
  // Calculate expense totals category-wise
  const data = [
    { name: "Food", value: 0 },
    { name: "Travel", value: 0 },
    { name: "Entertainment", value: 0 },
    { name: "Others", value: 0 },
  ].map((category) => {
    const total = transactions
      .filter((transaction) => transaction.category === category.name)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      ...category,
      value: total,
    };
  }).filter((category) => category.value > 0);

  return (
    <div style={{ width: "280px", height: "280px" }}>
      {data.length === 0 ? (
        <p>No expenses to display</p>
      ) : (
        <PieChart width={280} height={280}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `₹${value}`} />
        </PieChart>
      )}
    </div>
  );
};

export default ExpensePieChart;