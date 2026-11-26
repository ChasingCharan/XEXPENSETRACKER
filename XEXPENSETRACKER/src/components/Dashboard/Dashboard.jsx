import React, { useState } from "react";
import "./Dashboard.css";

import SummaryCard from "../SummaryCard/SummaryCard";
import ExpensePieChart from "../ExpensePieChart/ExpensePieChart";
import RecentTransactions from "../RecentTransactions/RecentTransactions";
import TopExpenses from "../TopExpenses/TopExpenses";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import EditExpenseModal from "../EditExpenseModal/EditExpenseModal";
import AddBalanceModal from "../AddBalanceModal/AddBalanceModal";

const Dashboard = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [walletBalance, setWalletBalance] = useState(4500);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Samosa",
      date: "2024-03-20",
      amount: 150,
      category: "Food",
    },
    {
      id: 2,
      name: "Movie",
      date: "2024-03-21",
      amount: 300,
      category: "Entertainment",
    },
    {
      id: 3,
      name: "Auto",
      date: "2024-03-22",
      amount: 50,
      category: "Travel",
    },
  ]);

  const totalExpenses = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  // Add Expense
  const handleAddExpense = (newExpense) => {
    setTransactions((prev) => [newExpense, ...prev]);

    setWalletBalance((prev) => prev - newExpense.amount);
  };

  // Open Edit Modal
  const handleEditExpense = (transaction) => {
    setSelectedExpense(transaction);
    setShowEditModal(true);
  };

  // Save Edited Expense
  const handleSaveExpense = (updatedExpense) => {
    const oldExpense = transactions.find(
      (transaction) => transaction.id === updatedExpense.id
    );

    if (!oldExpense) return;

    const difference = updatedExpense.price - oldExpense.amount;

    setWalletBalance((prev) => prev - difference);

    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedExpense.id
          ? {
              ...transaction,
                name: updatedExpense.title,
                amount: updatedExpense.price,
                category: updatedExpense.category,
                date: updatedExpense.date,
              }
          : transaction
      )
    );

    setShowEditModal(false);
    setSelectedExpense(null);
  };

  // Add Income
  const handleAddBalance = (incomeAmount) => {
    setWalletBalance((prev) => prev + incomeAmount);
  };

  // Delete Expense
  const handleDeleteExpense = (transaction) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== transaction.id)
    );

    setWalletBalance((prev) => prev + transaction.amount);
  };

  return (
    <>
      <div className="dashboard">
        <h1 className="dashboard-title">Expense Tracker</h1>

        <div className="SummarySection">
          <div className="SummaryCards">
            <SummaryCard
              title="Wallet Balance"
              amount={walletBalance}
              amountColor="#B5DC52"
              buttonText="+ Add Income"
              buttonColor="linear-gradient(90deg, #B5DC52 0%, #89E148 100%)"
              onButtonClick={() => setShowBalanceModal(true)}
            />

            <SummaryCard
              title="Expenses"
              amount={totalExpenses}
              amountColor="#FFB52E"
              buttonText="+ Add Expense"
              buttonColor="#FF4148"
              onButtonClick={() => setShowExpenseModal(true)}
            />
          </div>

          <div>
            <ExpensePieChart transactions={transactions} />

            <div className="expense-categories">
              <span className="food">
                <i className="color-box"></i>Food
              </span>

              <span className="travel">
                <i className="color-box"></i>Travel
              </span>

              <span className="Entertainment">
                <i className="color-box"></i>Entertainment
              </span>

              <span className="others">
                <i className="color-box"></i>Others
              </span>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <RecentTransactions
            transactions={transactions}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />

          <TopExpenses transactions={transactions} />
        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseModal && (
        <AddExpenseModal
          onClose={() => setShowExpenseModal(false)}
          onAdd={handleAddExpense}
        />
      )}

      {/* Edit Expense Modal */}
      {showEditModal && selectedExpense && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => {
            setShowEditModal(false);
            setSelectedExpense(null);
          }}
          onSave={handleSaveExpense}
        />
      )}

      {/* Add Balance Modal */}
      {showBalanceModal && (
        <AddBalanceModal
          onClose={() => setShowBalanceModal(false)}
          onAdd={handleAddBalance}
        />
      )}
    </>
  );
};

export default Dashboard;