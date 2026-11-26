
import React, { useState } from "react";
import {
    MdRestaurant,
    MdCardGiftcard,
    MdMovie,
    MdLuggage,
} from "react-icons/md";
import "./RecentTransactions.css";

const categoryIcons = {
    Food: <MdRestaurant />,
    Travel: <MdLuggage />,
    Entertainment: <MdMovie />,
    Others: <MdCardGiftcard />,
};

const ITEMS_PER_PAGE = 5;

const RecentTransactions = ({ transactions, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(transactions.length / ITEMS_PER_PAGE)
    );

    // Keep page valid after deleting the last item on a page
    React.useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const visibleTransactions = transactions.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const formatDate = (date) => {
        return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <section className="recent-transactions">
            <h2>Recent Transactions</h2>

            <div className="transactions-card">
                <div className="transaction-list">
                    {visibleTransactions.length > 0 ? (
                        visibleTransactions.map((transaction) => (
                            <div className="transaction-row" key={transaction.id}>
                                <div className="transaction-icon">
                                    {categoryIcons[transaction.category]}
                                </div>

                                <div className="transaction-details">
                                    <p>{transaction.name}</p>
                                    <span>{formatDate(transaction.date)}</span>
                                </div>

                                <span className="transaction-amount">
                                    ₹{transaction.amount.toLocaleString("en-IN")}
                                </span>

                                <button
                                    className="transaction-action delete-button"
                                    aria-label={`Delete ${transaction.name}`}
                                    onClick={() => onDelete(transaction)}
                                >
                                    ×
                                </button>

                                <button
                                    className="transaction-action edit-button"
                                    aria-label={`Edit ${transaction.name}`}
                                    onClick={() => onEdit(transaction)}
                                >
                                    ✎
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-transactions">
                            No transactions yet.
                        </p>
                    )}
                </div>

                <div className="transaction-pagination">
                  <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((page) => page - 1)}
                  >
                      ←
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <button
                          key={page}
                          className={currentPage === page ? "current-page" : ""}
                          onClick={() => setCurrentPage(page)}
                      >
                          {page}
                      </button>
                  ))}

                  <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((page) => page + 1)}
                  >
                      →
                  </button>
              </div>
            </div>
        </section>
    );
};

export default RecentTransactions;
