
import React, { useState } from "react";
import "./AddBalanceModal.css";

const AddBalanceModal = ({ onClose, onAdd }) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const incomeAmount = Number(amount);

        if (incomeAmount <= 0) {
            return;
        }

        onAdd(incomeAmount);
        onClose();
    };

    return (
        <div
            className="add-balance-overlay"
            onClick={onClose}
        >
            <div
                className="add-balance-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Add Balance</h2>

                <form onSubmit={handleSubmit}>
                    <div className="add-balance-row">
                        <input
                            type="number"
                            placeholder="Income Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                        />

                        <button type="submit" className="add-balance-btn">
                            Add Balance
                        </button>

                        <button
                            type="button"
                            className="balance-cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBalanceModal;
